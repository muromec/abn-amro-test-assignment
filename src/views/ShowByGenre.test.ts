import { ref } from 'vue'
import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/vue'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { routeLocationKey } from 'vue-router'
import ShowByGenre from './ShowByGenre.vue'
import { useShowsStore } from '@/stores/shows'

let shows: ReturnType<typeof useShowsStore>
type MockType = ReturnType<typeof vi.fn>
beforeEach(() => {
  setActivePinia(createTestingPinia({ createSpy: vi.fn }))
  shows = useShowsStore()
  ;(shows.filterByGenre as MockType).mockImplementation(() => ref([]))
})

function renderView(genre: string) {
  const route = {
    params: { query: genre }
  }
  render(ShowByGenre, { global: { provide: { [routeLocationKey as symbol]: route } } })
}

afterEach(cleanup)

it('should render without failures', () => {
  renderView('Mystery')
})

it('should kick off lazy loading on shows store', () => {
  renderView('Mystery')
  expect(shows.lazyLoad).toBeCalled()
})

it('should have single lists of requested genre and not loaders', () => {
  renderView('Mystery')
  expect(screen.getByTestId('show-title-id').textContent).toBe('Mystery')
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(0)
})

it('should have ghost loading state if store is still loading', () => {
  shows.testing.loadingState = 'loading'
  renderView('Mystery')
  expect(screen.queryAllByTestId('show-title-id')).toHaveLength(1)
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(1)
})

it('should replace loading states with error message', async () => {
  shows.testing.loadingState = 'error'
  renderView('Mystery')
  expect(screen.queryAllByTestId('show-title-id')).toHaveLength(0)
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(0)
  expect(screen.getByRole('alert').textContent).toMatch(/Something went a bit wrong/)
})
