import React from 'react'

import { render, fireEvent, screen, waitFor } from 'testUtils'

import { BasicUserForm } from './index'

const onSubmit = jest.fn()
const setup = () =>
  render(
    <BasicUserForm
      onSubmit={onSubmit}
      title="some title"
      buttonText="submit"
      redirectText="some link"
      redirectPath="some/path"
    />,
  )

describe('BasicUserForm', () => {
  test('Submit button is working', async () => {
    setup()
    const submitButton = screen.getByText('submit')
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
    })
  })

  test('Page title is correct', async () => {
    setup()
    const title = screen.getByText('some title')
    expect(title).toBeInTheDocument()
  })

  test('Redirect link is correct', async () => {
    setup()
    const link = screen.getByText('some link')
    expect(link).toBeInTheDocument()
    expect(link.href.includes('some/path')).toBe(true)
  })
})
