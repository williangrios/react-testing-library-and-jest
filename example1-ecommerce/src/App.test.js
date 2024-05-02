import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import App from './App'

test('shows 6 products by default', async () => {
  render(<App />)
  const titles = await screen.findAllByRole('heading')
  expect(titles).toHaveLength(6)
})

test('clicking the button load 6 more products', async () => {
  render(<App />)
  const button = await screen.findByRole('button', {
    name: /load more/i,
  })
  user.click(button)
  // we should to wait a little bit
  await waitFor(async () => {
    const titles = await screen.findAllByRole('heading')
    expect(titles).toHaveLength(12)
  })
})
