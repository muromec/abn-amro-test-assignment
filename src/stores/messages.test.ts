import { vi, expect, it, beforeEach } from 'vitest'
import { useMessagesStore } from './messages'
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.stubGlobal('fetch', vi.fn())
})

it('should have empty stack initially', () => {
  const messages = useMessagesStore()
  expect(messages.stack).toEqual([])
})

it('should have one message with id after user adds it', () => {
  const messages = useMessagesStore()
  messages.addMessage('error', 'Failed to load')
  expect(messages.stack).toEqual([{ id: 0, type: 'error', contents: 'Failed to load' }])
})

it('should have both messages added by user sequentially', () => {
  const messages = useMessagesStore()
  messages.addMessage('error', 'Failed to load')
  messages.addMessage('notify', 'Wakker worden Neo!')
  expect(messages.stack).toEqual([
    { id: 0, type: 'error', contents: 'Failed to load' },
    { id: 1, type: 'notify', contents: 'Wakker worden Neo!' }
  ])
})

it('should remove single message preserving ids', () => {
  const messages = useMessagesStore()
  messages.addMessage('error', 'Failed to load')
  messages.addMessage('notify', 'Wakker worden Neo!')
  messages.addMessage('error', 'Failed to fail')
  messages.removeMessage(1)
  expect(messages.stack).toEqual([
    { id: 0, type: 'error', contents: 'Failed to load' },
    { id: 2, type: 'error', contents: 'Failed to fail' }
  ])
})
