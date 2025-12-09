import userEvent from '@testing-library/user-event'
import * as firebaseAuth from 'firebase/auth'
import { AuthErrorCodes } from 'firebase/auth'

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

  it('should show error when password and password confirmation are different', async () => {
    renderWithRedux(
      <SignUpPage />,
      {}
    )

    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    const passwordConfirmationInput = screen.getByPlaceholderText(/confirm your password/i)

    userEvent.type(passwordInput, '123456')
    userEvent.type(passwordConfirmationInput, '12345678')

    const submitButton = screen.getByText('Create Account', { selector: 'button' })

    userEvent.click(submitButton)

    await screen.findByText(/passwords do not match/i)
  })

  it('should show error when password has less than 6 characters', async () => {
    renderWithRedux(
      <SignUpPage />,
      {}
    )

    const passwordInput = screen.getByPlaceholderText(/enter your password/i)

    userEvent.type(passwordInput, '123')

    const submitButton = screen.getByText('Create Account', { selector: 'button' })
    userEvent.click(submitButton)

    await screen.findByText(/password must be at least 6 characters/i)
  })

  it('should show error if email already exists', async () => {
    const mockFirebaseAuth = firebaseAuth as any

    renderWithRedux(
      <SignUpPage />,
      {}
    )

    mockFirebaseAuth.createUserWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: AuthErrorCodes.EMAIL_EXISTS })
    )

    const nameInput = screen.getByPlaceholderText(/enter your first name/i)
    const lastName = screen.getByPlaceholderText(/enter your last name/i)
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    const passwordConfirmationInput = screen.getByPlaceholderText(/confirm your password/i)

    userEvent.type(nameInput, 'Lorem')
    userEvent.type(lastName, 'Ipsum')
    userEvent.type(emailInput, 'lorem@ipsum.com')
    userEvent.type(passwordInput, '12345678')
    userEvent.type(passwordConfirmationInput, '12345678')

    const submitButton = screen.getByText('Create Account', { selector: 'button' })

    userEvent.click(submitButton)

    await screen.findByText(/email is already in use/i)
  })
})