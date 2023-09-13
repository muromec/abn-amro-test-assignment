import { expect, it, afterEach } from 'vitest'
import { screen, render, cleanup, fireEvent } from '@testing-library/vue'
import LocaleSelector from './LocaleSelector.vue'

afterEach(cleanup)

it('should render selection of two languages', () => {
  render(LocaleSelector)
  expect(screen.getAllByRole('menuitem').map((element) => element.textContent)).toEqual([
    'EN',
    'FR'
  ])
})

it('should have EN selected by default', () => {
  render(LocaleSelector)
  const lang = document.querySelector('[aria-selected=true]') as HTMLElement
  expect(lang.textContent).toBe('EN')
})

it('should swtich to FR by click', async () => {
  render(LocaleSelector)
  const langFR = screen.getByText('FR')
  await fireEvent.click(langFR)
  const langSelected = document.querySelector('[aria-selected=true]') as HTMLElement
  expect(langSelected.textContent).toBe('FR')
})
