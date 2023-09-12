import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent, mount, render, cleanup } from '@testing-library/vue'
import Message from './Message.vue'

afterEach(cleanup)

it('should render error message', () => {
  render(Message, { propsData: { id: 1, type: 'error', content: 'Oops' } })
  expect(screen.getByRole('alert').textContent).toMatch(/Error/)
  expect(screen.getByRole('alert').textContent).toMatch(/Oops/)
})

it('should render notify message', () => {
  render(Message, { propsData: { id: 1, type: 'notify', content: 'Read this' } })
  expect(screen.getByRole('alert').textContent).toMatch(/Info/)
  expect(screen.getByRole('alert').textContent).toMatch(/Read this/)
})

it('should emit close when button is pressed', () => {
  const wrapper = render(Message, { propsData: { id: 1, type: 'error', content: 'Oops' } })
  fireEvent.click(screen.getByText('Close'))
  expect(wrapper.emitted().close).toEqual([[1]])
})
