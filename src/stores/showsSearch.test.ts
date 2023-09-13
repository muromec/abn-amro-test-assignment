import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { useShowsSearchStore } from './showsSearch'

import { setActivePinia, createPinia } from 'pinia'

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
  const search = useShowsSearchStore()
  expect(search.list).toBe(null)
})

it('should not call API when created', () => {
  useShowsSearchStore()
  expect(mockedFetch).not.toBeCalled()
})

it('should pass search term to ?q= of /shows endpoint', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, []))
  const search = useShowsSearchStore()
  await search.searchFor('Drama')
  expect(mockedFetch).toBeCalledWith(new URL('https://api.tvmaze.com/search/shows?q=Drama'))
  expect(mockedFetch).toHaveBeenCalledTimes(1)
  expect(search.list).toEqual([])
  expect(search.isError).toBe(false)
})

it('should keep cached search results if the terms did not change', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, []))
  const search = useShowsSearchStore()
  await search.searchFor('Drama')
  expect(mockedFetch).toHaveBeenCalledTimes(1)
  await search.searchFor('Drama')
  expect(mockedFetch).toHaveBeenCalledTimes(1)
})

it('should reload search results if search term changed', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(true, []))
  const search = useShowsSearchStore()
  await search.searchFor('Drama')
  expect(mockedFetch).toHaveBeenCalledTimes(1)
  await search.searchFor('Mystery')
  expect(mockedFetch).toHaveBeenCalledTimes(2)
})

it('should keep list set to null if loading errors out', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(false, []))
  const search = useShowsSearchStore()
  await search.searchFor('Drama')
  expect(search.list).toEqual(null)
})

it('should expose loading and error flags', async () => {
  mockedFetch.mockImplementationOnce(makeHttpMock(false, []))
  const search = useShowsSearchStore()
  // before
  expect(search.isError).toBe(false)
  expect(search.isLoading).toBe(false)
  const loadingTask = search.searchFor('Drama')
  // during
  expect(search.isError).toBe(false)
  expect(search.isLoading).toBe(true)
  await loadingTask
  // after
  expect(search.isError).toBe(true)
  expect(search.isLoading).toBe(false)
})
