import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent, render, cleanup } from '@testing-library/vue'
import MessageArea from './MessageArea.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useMessagesStore } from '@/stores/messages'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(cleanup)

it('should render empty container', () => {
  render(MessageArea)
  expect(screen.queryAllByRole('alert')).toHaveLength(0)
})

it('should render two messages', () => {
  const messages = useMessagesStore()
  messages.addMessage('error', 'Oops')
  messages.addMessage('notify', 'Read this')
  render(MessageArea)
  expect(screen.queryAllByRole('alert')).toHaveLength(2)
})

it('should keep one message after dismissing the other', async () => {
  const messages = useMessagesStore()
  messages.addMessage('error', 'Oops')
  messages.addMessage('notify', 'Read this')
  render(MessageArea)

  expect(screen.queryAllByRole('alert')).toHaveLength(2)
  await fireEvent.click(screen.getAllByText('Close')[1])
  expect(screen.queryAllByRole('alert')).toHaveLength(1)
  expect(screen.getByRole('alert').textContent).toMatch(/Oops/)
})
