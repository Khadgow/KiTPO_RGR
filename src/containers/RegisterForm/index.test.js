import React from 'react'

import { render, fireEvent, waitFor, screen } from 'testUtils/jestUtils'

import { RegisterForm } from './index'

const setup = () => render(<RegisterForm />)

describe('RegisterForm', () => {
  test('No errors for valid data', async () => {
    setup()
    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const nameInput = screen.getByTestId('name')
    const lastNameInput = screen.getByTestId('lastName')
    const birthdateInput = screen.getByTestId('birthdate')
    const submit = screen.getByTestId('submit')
    fireEvent.change(emailInput, { target: { value: 'some_valid@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'testTest123456' } })
    fireEvent.change(nameInput, { target: { value: 'name' } })
    fireEvent.change(lastNameInput, { target: { value: 'last name' } })
    fireEvent.change(birthdateInput, { target: { value: '01/01/2000' } })
    fireEvent.click(submit)
    try {
      const errors = await screen.findAllByText('errors', { exact: false })
      expect(errors).toHaveLength(0)
    } catch (error) {
      expect(error.message.includes('Unable to find an element')).toEqual(true)
      expect(emailInput.value).toBe('some_valid@mail.com')
      expect(passwordInput.value).toBe('testTest123456')
      expect(nameInput.value).toBe('name')
      expect(lastNameInput.value).toBe('last name')
      expect(birthdateInput.value).toBe('01/01/2000')
    }
  })
  test('Show errors for invalid data', async () => {
    setup()

    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submit = screen.getByTestId('submit')

    fireEvent.change(emailInput, { target: { value: 'some_invalid_email' } })
    fireEvent.change(passwordInput, { target: { value: '' } })
    fireEvent.click(submit)

    await waitFor(async () => {
      expect(emailInput.value).toBe('some_invalid_email')
      expect(passwordInput.value).toBe('')
      expect(await screen.findByText('errors.email')).toBeInTheDocument()
      expect(await screen.findByText('errors.required')).toBeInTheDocument()
    })
  })
})
