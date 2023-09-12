import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent, render, cleanup } from '@testing-library/vue'
import ShowThumbnailList from './ShowThumbnailList.vue'
import router from '@/router'
import { MOCK_SHOW_LIST } from '@/mocks/shows'
import type { Show } from '@/stores/types'

afterEach(cleanup)
afterEach(() => {
  vi.restoreAllMocks()
})

function renderList({ isLoading = false }: { isLoading?: boolean } = {}) {
  const props = {
    title: 'Genre name',
    list: MOCK_SHOW_LIST,
    isLoading
  }
  vi.spyOn(router, 'push')
  render(ShowThumbnailList, { global: { plugins: [router] }, props })
  screen.queryAllByRole('listitem').forEach((li) => {
    li.scrollIntoView = vi.fn()
  })
}

it('should render list of posters', () => {
  renderList()
  const images = screen.getAllByTestId('poster')
  expect(images).toHaveLength(MOCK_SHOW_LIST.length)
})

it('should render list of 30 skeletons instead of images while loading', () => {
  renderList({ isLoading: true })
  const images = screen.queryAllByTestId('poster')
  expect(images).toHaveLength(0)
  expect(screen.queryAllByTestId('show-skeleton')).toHaveLength(30)
})

it('should highlight first post and scroll page to it when list if focused', async () => {
  renderList()
  const listItems = screen.getAllByRole('listitem')
  expect(listItems[0].className).not.toMatch(/--selected/)
  await fireEvent.focus(screen.getByRole('list'))
  expect(listItems[0].className).toMatch(/--selected/)
  expect(listItems[0].scrollIntoView).toBeCalled()
})

it('should remove highlight on blur', async () => {
  renderList()
  const listItems = screen.getAllByRole('listitem')
  await fireEvent.focus(screen.getByRole('list'))
  expect(listItems[0].className).toMatch(/--selected/)
  await fireEvent.blur(screen.getByRole('list'))
  expect(listItems[0].className).not.toMatch(/--selected/)
})

it('should navigate to selected item with Space', async () => {
  renderList()
  const listItems = screen.getAllByRole('listitem')
  await fireEvent.focus(screen.getByRole('list'))
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'Space' })
  expect(router.push).toBeCalledWith('/show/0/')
})

it('should navigate to last item in the list with <', async () => {
  renderList()
  const listItems = screen.getAllByRole('listitem')
  await fireEvent.focus(screen.getByRole('list'))
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'ArrowLeft' })
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'Space' })
  expect(router.push).toBeCalledWith('/show/3/')
})

it('should navigate to next item in the list with >', async () => {
  renderList()
  const listItems = screen.getAllByRole('listitem')
  await fireEvent.focus(screen.getByRole('list'))
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'ArrowRight' })
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'Space' })
  expect(router.push).toBeCalledWith('/show/1/')
})

it('should loop back to first list element after then end', async () => {
  renderList()
  const listItems = screen.getAllByRole('listitem')
  await fireEvent.focus(screen.getByRole('list'))
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'ArrowRight' })
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'ArrowRight' })
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'ArrowRight' })
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'ArrowRight' })
  await fireEvent.keyDown(screen.getByRole('list'), { key: 'Space' })
  expect(router.push).toBeCalledWith('/show/0/')
})
