import userEvent from '@testing-library/user-event'
import { renderWithRedux } from '../../helpers/test.helpers'
import LoginPage from './login.page'
import { screen } from '@testing-library/react'

jest.mock('firebase/auth')

describe('Login', () => {
  it('should show erros when trying to submit without filling all required fields', async () => {
    renderWithRedux(<LoginPage />, {})

    const submitButton = screen.getByText('Sign In')

    userEvent.click(submitButton)

    await screen.findByText(/email is required/i)
    screen.getByText(/password is required/i)
  })
})