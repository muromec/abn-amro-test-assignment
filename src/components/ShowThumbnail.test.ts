import { expect, it, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/vue'
import ShowThumbnail from './ShowThumbnail.vue'
import router from '@/router'
import { MOCK_SHOW_LIST } from '@/mocks/shows'
import type { Show } from '@/stores/types'

afterEach(cleanup)

function renderShow(show: Show) {
  const props = {
    id: show.id,
    name: show.name,
    image: show.image.medium,
    isSelected: false
  }
  render(ShowThumbnail, { global: { plugins: [router] }, props })
}

it('should render poster with alt and name', () => {
  const [MOCK_SHOW] = MOCK_SHOW_LIST
  renderShow(MOCK_SHOW_LIST[0])
  const image = screen.getByTestId('poster') as HTMLImageElement
  expect(image.src).toContain(MOCK_SHOW.image.medium)
  expect(image.alt).toBe(`Poster for ${MOCK_SHOW.name}`)
  expect(image.title).toBe(MOCK_SHOW.name)
})
