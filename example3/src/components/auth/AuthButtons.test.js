import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { createServer } from '../../test/server'
import AuthButtons from './AuthButtons'

async function renderComponent() {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  )
  await screen.findAllByRole('link')
}

describe('when user is not signed in', () => {
  // createServer() -> GET '/api/user' -> {user: null}
  createServer([
    {
      path: '/api/user',
      res: () => {
        return { user: null }
      },
    },
  ])
  test('sign in button and sign out button are visible', async () => {
    await renderComponent()
    const signInButton = screen.getByRole('link', {
      name: /sign in/i,
    })
    const signUpButton = screen.getByRole('link', {
      name: /sign up/i,
    })
    expect(signInButton).toBeInTheDocument()
    expect(signInButton).toHaveAttribute('href', '/signin')
    expect(signUpButton).toBeInTheDocument()
    expect(signUpButton).toHaveAttribute('href', '/signup')
  })

  test('sign out button is not visible', async () => {
    await renderComponent()
    const signOutButton = screen.queryByRole('link', {
      name: /sign out/i,
    })
    expect(signOutButton).not.toBeInTheDocument()
  })
})

describe('when user is is signed in', () => {
  // createServer() -> GET '/api/user' -> {user: {id: 1, email:'test@test.com'}}
  createServer([
    {
      path: '/api/user',
      res: () => {
        return { user: { id: 1, email: 'test@test.com.br' } }
      },
    },
  ])

  test('sign in button and sign up button are not visible', async () => {
    await renderComponent()
    const signInButton = screen.queryByRole('link', {
      name: /sign in/i,
    })
    const signUpButton = screen.queryByRole('link', {
      name: /sign up/i,
    })
    expect(signInButton).not.toBeInTheDocument()
    expect(signUpButton).not.toBeInTheDocument()
  })

  test('sign out is visible', async () => {
    await renderComponent()
    const signOutButton = screen.getByRole('link', {
      name: /sign out/i,
    })
    expect(signOutButton).toBeInTheDocument()
    expect(signOutButton).toHaveAttribute('href', '/signout')
  })
})

const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 100)
  })
