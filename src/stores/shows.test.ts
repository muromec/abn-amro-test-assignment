import { vi, expect, test, beforeEach, afterEach } from 'vitest'
import { useShowsStore } from './shows'
import { setActivePinia, createPinia } from 'pinia'

function makeHttpMock(isOk, jsonData) {
  const response = {
    ok: isOk,
    json: () => Promise.resolve(jsonData)
  }
  return async () => response
}

beforeEach(() => {
  setActivePinia(createPinia())
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('should have no list in initial state', () => {
  const shows = useShowsStore()
  expect(shows.list).toBe(null)
})

test('should not call API when created', () => {
  const shows = useShowsStore()
  expect(fetch).not.toBeCalled()
})

test('should load all shows when called load()', async () => {
  fetch.mockImplementationOnce(makeHttpMock(true, []))
  const shows = useShowsStore()
  await shows.load()
  expect(fetch).toBeCalled('https://api.tvmaze.com/shows')
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(shows.list).toEqual([])
})

test('should keep list set to null if loading errors out', async () => {
  fetch.mockImplementationOnce(makeHttpMock(false, []))
  const shows = useShowsStore()
  await shows.load()
  expect(shows.list).toEqual(null)
})
