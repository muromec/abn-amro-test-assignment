import { vi, expect, it, beforeEach, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/vue'
import ShowSkeletonList from './ShowSkeletonList.vue'

afterEach(cleanup)

it('should render $count number of skeleton instances with gradient and animations', () => {
  render(ShowSkeletonList, { propsData: { title: 'Title', count: 30 } })
  screen.getByText('Title')
  expect(screen.queryAllByTestId('show-skeleton')).toHaveLength(30)
})
