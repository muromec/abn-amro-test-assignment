import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/vue'
import ErrorMessage from './ErrorMessage.vue'

afterEach(cleanup)

it('should simple error message', () => {
  render(ErrorMessage)
  expect(screen.getByRole('alert').textContent).toMatch(/Something went a bit wrong/)
})
