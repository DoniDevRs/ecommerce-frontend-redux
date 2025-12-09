import userEvent from '@testing-library/user-event'
//import * as firebaseAuth from 'firebase/auth'
//import { AuthErrorCodes } from 'firebase/auth'

import { renderWithRedux } from '../../helpers/test.helpers'
import SignUpPage from './sign-up.page'
import { screen } from '@testing-library/react'

jest.mock('firebase/auth')

describe('Sign Up', () => {
  it('should show error when trying to submit without filling all required fields', async () => {
    renderWithRedux(<SignUpPage />, {})

    const submitButton = screen.getByText('Create Account', { selector: 'button' })

    userEvent.click(submitButton)

    await screen.findByText(/first name is required/i)
    screen.getByText(/last name is required/i)
    screen.getByText(/email is required/i)
    screen.getByText(/password is required/i)
    screen.getByText(/password confirmation is required/i)
  })

  it('should show error when filling an invalid email', async () => {
    renderWithRedux(
      <SignUpPage />,
      {}
    )

    const emailInput = screen.getByPlaceholderText(/enter your email/i)

    userEvent.type(emailInput, 'invalid_email')

    const submitButton = screen.getByText('Create Account', { selector: 'button' })
    userEvent.click(submitButton)

    await screen.findByText(/invalid email/i)
  })
})