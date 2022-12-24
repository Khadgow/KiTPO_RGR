import React from 'react'

import { render, fireEvent, screen, waitFor } from 'testUtils'

import { BasicPostForm } from './index'

const onSubmit = jest.fn()
const onDelete = jest.fn()
const setup = () =>
  render(<BasicPostForm onSubmit={onSubmit} onDelete={onDelete} pageTitle="some title" />)

describe('BasicPostForm', () => {
  test('Submit button is working', async () => {
    setup()
    const submitButton = screen.getByText('cardForm.submitButton')
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
    })
  })

  test('Delete button is working', async () => {
    setup()
    const deleteButton = screen.getByText('cardForm.deleteButton')
    fireEvent.click(deleteButton)
    expect(onDelete).toHaveBeenCalled()
  })

  test('Page title is correct', async () => {
    setup()
    const title = screen.getByText('some title')
    expect(title).toBeInTheDocument()
  })
})
