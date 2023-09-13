import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { useShowsStore } from './shows'
import { useShowDetails } from './showDetails'

import { setActivePinia, createPinia } from 'pinia'

import { MOCK_SHOW_LIST } from '@/mocks/shows'

function makeHttpMock<ResponseType>(isOk: boolean, jsonData: ResponseType) {
  const response = {
    ok: isOk,
    json: () => Promise.resolve(jsonData)
  }
  return async () => response
}

const mockedFetch = vi.fn()
beforeEach(() => {
  setActivePinia(createPinia())
  vi.stubGlobal('fetch', mockedFetch.mockReset())
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should not call API when created', () => {
  useShowDetails()
  expect(mockedFetch).not.toBeCalled()
})

it('should load single show details)', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, []))
  const details = useShowDetails()
  await details.lazyLoadById(1)
  expect(mockedFetch).toBeCalledWith('https://api.tvmaze.com/shows/1')
  expect(mockedFetch).toHaveBeenCalledTimes(1)
  expect(details.isErrorById(1).value).toBe(false)
})

it('should load details only once for the same id', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, []))
  const details = useShowDetails()
  await details.lazyLoadById(1)
  expect(mockedFetch).toHaveBeenCalledTimes(1)
  await details.lazyLoadById(1)
  expect(mockedFetch).toHaveBeenCalledTimes(1)
})

it('should reuse entry details from cahce if it is present there', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, MOCK_SHOW_LIST))
  const shows = useShowsStore()
  await shows.load()
  const details = useShowDetails()
  await details.lazyLoadById(1)
  expect(mockedFetch).toHaveBeenCalledTimes(1)
  expect(mockedFetch).toBeCalledWith('https://api.tvmaze.com/shows')
  await details.lazyLoadById(1)
  expect(mockedFetch).toHaveBeenCalledTimes(1)
})

it('should load details separately for two different ids and keep both in cache', async () => {
  mockedFetch
    .mockImplementationOnce(makeHttpMock(true, MOCK_SHOW_LIST[1]))
    .mockImplementationOnce(makeHttpMock(true, MOCK_SHOW_LIST[2]))

  const details = useShowDetails()
  await details.lazyLoadById(1)
  expect(mockedFetch).toHaveBeenCalledTimes(1)
  expect(mockedFetch).toBeCalledWith('https://api.tvmaze.com/shows/1')

  await details.lazyLoadById(2)
  expect(mockedFetch).toHaveBeenCalledTimes(2)
  expect(mockedFetch).toBeCalledWith('https://api.tvmaze.com/shows/2')

  expect(details.findDetails(1).value).toEqual(MOCK_SHOW_LIST[1])
  expect(details.findDetails(2).value).toEqual(MOCK_SHOW_LIST[2])
})

it('should expose error flag and return details as null if request fails', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(false, []))
  const details = useShowDetails()
  expect(details.isErrorById(1).value).toBe(false)

  await details.lazyLoadById(1)
  expect(details.findDetails(1).value).toEqual(null)
  expect(details.isErrorById(1).value).toBe(true)
})

it('should expose loading and error flags per entry id', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(false, []))
  const details = useShowDetails()
  // before
  expect(details.isErrorById(1).value).toBe(false)
  expect(details.isLoadingById(1).value).toBe(false)
  const loadingTask = details.lazyLoadById(1)
  // during
  expect(details.isErrorById(1).value).toBe(false)
  expect(details.isLoadingById(1).value).toBe(true)
  expect(details.isLoadingById(2).value).toBe(false)

  await loadingTask
  // after
  expect(details.isErrorById(1).value).toBe(true)
  expect(details.isErrorById(2).value).toBe(false)

  expect(details.isLoadingById(1).value).toBe(false)
})
