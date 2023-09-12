import { ref } from 'vue'
import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import HomeView from './HomeView.vue'
import { useShowsStore } from '@/stores/shows'

let pinia
let shows: ReturnType<typeof useShowsStore>
type MockType = ReturnType<typeof vi.fn>
beforeEach(() => {
  pinia = createTestingPinia({ createSpy: vi.fn })
  shows = useShowsStore()
  ;(shows.filterByGenre as MockType).mockImplementation(() => ref([]))
})

afterEach(cleanup)

it('should render without failures', () => {
  render(HomeView)
})

it('should kick off lazy loading on shows store', () => {
  render(HomeView)
  expect(shows.lazyLoad).toBeCalled()
})

it('should have three lists by genre and not loaders', () => {
  render(HomeView)
  expect(screen.getAllByTestId('show-title-id').map((element) => element.textContent)).toEqual([
    'Drama',
    'Comedy',
    'Mystery'
  ])
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(0)
})

it('should have three ghost states as loaders if loading is still in progress', () => {
  shows.testing.loadingState = 'loading'
  render(HomeView)
  expect(screen.queryAllByTestId('show-title-id')).toHaveLength(3)
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(3)
})

it('should replace loading states with error message', async () => {
  shows.testing.loadingState = 'error'
  render(HomeView)
  expect(screen.queryAllByTestId('show-title-id')).toHaveLength(0)
  expect(screen.queryAllByTestId('show-skeletons')).toHaveLength(0)
  expect(screen.getByRole('alert').textContent).toMatch(/Something went a bit wrong/)
})
