import { render, screen, within } from '@testing-library/react'
import UserList from './UserList'

function renderComponent() {
  const users = [
    { name: 'jane', email: 'jane@gmail.com' },
    { name: 'sam', email: 'sam@gmail.com' },
  ]
  render(<UserList users={users} />)
  return {
    users,
  }
}

test('It should render one row per user', () => {
  renderComponent()
  const rows = within(screen.getByTestId('users')).getAllByRole('row')
  expect(rows).toHaveLength(2)
})

test('It should render email and name of each user', () => {
  const { users } = renderComponent()

  for (let user of users) {
    const cellName = screen.getByText(user.name)
    const cellEmail = screen.getByText(user.email)
    expect(cellName).toBeInTheDocument()
    expect(cellEmail).toBeInTheDocument()
  }
})
