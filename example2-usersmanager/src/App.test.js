import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import App from './App'

test('can receive a new user and show it on a list', async () => {
  render(<App />)
  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  })
  const emailInput = screen.getByRole('textbox', {
    name: /enter email/i,
  })
  await user.click(nameInput)
  await user.keyboard('willian')
  await user.click(emailInput)
  await user.keyboard('willian@gmail.com')
  const button = screen.getByRole('button')
  await user.click(button)

  const nameCell = screen.getByRole('cell', { name: 'willian' })
  const emailCell = screen.getByRole('cell', { name: 'willian@gmail.com' })
  expect(nameCell).toBeInTheDocument()
  expect(emailCell).toBeInTheDocument()
})
