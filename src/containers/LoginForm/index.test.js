import React from 'react'

import { render, fireEvent, screen } from 'testUtils/jestUtils'

import { LoginForm } from './index'

const setup = () => render(<LoginForm />)

describe('LoginForm', () => {
  test('No errors for valid data', async () => {
    setup()
    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submit = screen.getByTestId('submit')
    fireEvent.change(emailInput, { target: { value: 'some_valid@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'testTest123456' } })
    fireEvent.click(submit)
    try {
      const errors = await screen.findAllByText('errors', { exact: false })
      expect(errors).toHaveLength(0)
    } catch (error) {
      expect(error.message.includes('Unable to find an element')).toEqual(true)
      expect(emailInput.value).toBe('some_valid@mail.com')
      expect(passwordInput.value).toBe('testTest123456')
    }
  })
  test('Show errors for invalid data', async () => {
    setup()

    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submit = screen.getByRole('button')

    fireEvent.change(emailInput, { target: { value: 'some_invalid_email' } })
    fireEvent.change(passwordInput, { target: { value: '' } })
    fireEvent.click(submit)

    expect(emailInput.value).toBe('some_invalid_email')
    expect(passwordInput.value).toBe('')
    expect(await screen.findByText('errors.email')).toBeInTheDocument()
    expect(await screen.findByText('errors.required')).toBeInTheDocument()
  })
})
