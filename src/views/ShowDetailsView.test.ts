import { h } from 'vue'
import type { ComponentOptions } from 'vue'
import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/vue'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { routeLocationKey } from 'vue-router'
import ShowDetailsView from './ShowDetailsView.vue'
import { useShowDetails } from '@/stores/showDetails'
import type { Show } from '@/stores/types'
import { MOCK_SHOW_LIST } from '@/mocks/shows'

let details: ReturnType<typeof useShowDetails>
const errorStates: { [key: string]: boolean } = {}
const detailsCache: { [key: string]: Show } = {}
const RouterLink: ComponentOptions = {
  render() {
    return h('a', { href: this.$props.to }, [])
  }
}
type MockType = ReturnType<typeof vi.fn>
beforeEach(() => {
  setActivePinia(createTestingPinia({ createSpy: vi.fn }))
  details = useShowDetails()
  ;(details.findDetails as MockType).mockImplementation((id: number) => detailsCache[id])
  ;(details.isErrorById as MockType).mockImplementation((id: number) => errorStates[id])

  delete errorStates[1]
  delete detailsCache[1]
})

function renderView(id: string) {
  const route = {
    params: { id }
  }
  render(ShowDetailsView, {
    global: { provide: { [routeLocationKey as symbol]: route }, components: { RouterLink } }
  })
}

afterEach(cleanup)

it('should render without failures', () => {
  renderView('1')
})

it('should kick off loading details by id', () => {
  renderView('1')
  expect(details.lazyLoadById).toBeCalledWith(1)
})

it('should show loaded info on success', () => {
  detailsCache[1] = MOCK_SHOW_LIST[1]
  renderView('1')
  expect(screen.getByTestId('show-title-id').textContent).toBe('Something')
})

it('should replace loading states with error message', async () => {
  errorStates[1] = true
  renderView('1')
  expect(screen.queryAllByTestId('show-title-id')).toHaveLength(0)
  expect(screen.getByRole('alert').textContent).toMatch(/Something went a bit wrong/)
})
