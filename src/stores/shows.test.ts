import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { useShowsStore } from './shows'
import type { Show } from './shows'

import { useMessagesStore } from './messages'
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

it('should have no list in initial state', () => {
  const shows = useShowsStore()
  expect(shows.list).toBe(null)
})

it('should not call API when created', () => {
  const shows = useShowsStore()
  expect(mockedFetch).not.toBeCalled()
})

it('should load all shows when called load()', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, []))
  const shows = useShowsStore()
  await shows.load()
  expect(mockedFetch).toBeCalledWith('https://api.tvmaze.com/shows')
  expect(mockedFetch).toHaveBeenCalledTimes(1)
  expect(shows.list).toEqual([])
})

it('should keep list set to null if loading errors out', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(false, []))
  const shows = useShowsStore()
  await shows.load()
  expect(shows.list).toEqual(null)
})

it('should expose list filtered by genres', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, MOCK_SHOW_LIST))
  const shows = useShowsStore()
  await shows.load()
  expect(shows.filterByGenre('Mystery').value).toMatchObject([{ id: 2 }, { id: 3 }])
})

it('should expose details of singular show', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, MOCK_SHOW_LIST))
  const shows = useShowsStore()
  await shows.load()
  expect(shows.findDetails(3).value).toEqual(MOCK_SHOW_LIST[3])
})

// integration
it('should put generic error to messages store when errors out', async () => {
  const messages = useMessagesStore()
  mockedFetch.mockImplementationOnce(makeHttpMock(false, []))
  const shows = useShowsStore()
  await shows.load()
  expect(messages.stack).toMatchObject([{ contents: /Oops/ }])
})
