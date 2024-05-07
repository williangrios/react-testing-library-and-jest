import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import UserForm from './UserForm'

test('Should show two inputs and a button', () => {
  const argList = []
  const callBack = (...args) => {
    argList.push(args)
  }
  render(<UserForm onUserAdd={callBack} />)
  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByRole('button')
  expect(inputs).toHaveLength(2)
  expect(button).toBeInTheDocument()
})

test('it calls onUserAdd when the form is submitted', async () => {
  const mock = jest.fn()
  render(<UserForm onUserAdd={mock} />)
  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  })
  const emailInput = screen.getByRole('textbox', {
    name: /enter email/i,
  })

  await user.click(nameInput)
  await user.keyboard('teste')
  await user.click(emailInput)
  await user.keyboard('teste@gmail.com')

  const button = screen.getByRole('button')
  await user.click(button)
  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledWith({ name: 'teste', email: 'teste@gmail.com' })
})

test('empties the two inputs when form is submitted', async () => {
  const mock = jest.fn()
  render(<UserForm onUserAdd={mock} />)
  // screen.render(<UserForm onUserAdd={() => {})} />)
  const nameInput = screen.getByRole('textbox', { name: /name/i })
  const emailInput = screen.getByRole('textbox', { name: /email/i })
  const button = screen.getByRole('button')
  await user.click(nameInput)
  await user.keyboard('willian')
  await user.click(emailInput)
  await user.keyboard('williangrios@gmail.com')
  await user.click(button)
  expect(nameInput).toHaveValue('')
  expect(emailInput).toHaveValue('')
})
