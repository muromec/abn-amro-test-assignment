import { ref, provide, inject } from 'vue'
import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { routeLocationKey } from 'vue-router'
import ShowSearchResult from './ShowSearchResult.vue'
import { useShowsSearchStore } from '@/stores/showsSearch'

let pinia
let showsSearch: ReturnType<typeof useShowsSearchStore>
type MockType = ReturnType<typeof vi.fn>
beforeEach(() => {
  pinia = createTestingPinia({ createSpy: vi.fn })
  showsSearch = useShowsSearchStore()
  ;(showsSearch.searchFor as MockType).mockImplementation(() => ref([]))
})

function renderView(query: string) {
  const route = {
    params: { query: query }
  }
  render(ShowSearchResult, { global: { provide: { [routeLocationKey as symbol]: route } } })
}

afterEach(cleanup)

it('should render without failures', () => {
  renderView('Mystery')
})

it('should kick off search on mount', () => {
  renderView('Cops')
  expect(showsSearch.searchFor).toBeCalledWith('Cops')
})

it('should have single list of search results', () => {
  renderView('Spies')
  expect(screen.getByTestId('show-title-id').textContent).toBe('Search results')
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(0)
})

it('should have ghost loading state if store is still loading', () => {
  showsSearch.testing.loadingState = 'loading'
  renderView('Travel')
  expect(screen.queryAllByTestId('show-title-id')).toHaveLength(1)
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(1)
})

it('should replace loading states with error message', async () => {
  showsSearch.testing.loadingState = 'error'
  renderView('Murder')
  expect(screen.queryAllByTestId('show-title-id')).toHaveLength(0)
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(0)
  expect(screen.getByRole('alert').textContent).toMatch(/Something went a bit wrong/)
})
