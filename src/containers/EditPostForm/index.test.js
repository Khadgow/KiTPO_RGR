import React from 'react'
import { waitFor } from '@testing-library/react'

import { render, fireEvent, screen, servers, waitForElementToBeRemoved } from 'testUtils'

import { EditPostForm } from './index'

const setup = () => render(<EditPostForm />)

const requestFunc = jest.fn()

const mockedPost = { id: 1, title: 'Some title', content: 'Some content' }
const newPost = { title: 'Some title1', content: 'Some content1' }

const server = servers.editPostForm({
  requestFunc,
  mockedPost,
})
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: String(mockedPost.id) }),
  useHistory: () => ({ push: () => undefined }),
}))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('EditPostForm', () => {
  test('No errors for valid data, correct create request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const titleInput = screen.getByTestId('title')
    const contentInput = screen.getByTestId('content')
    const submitButton = screen.getByText('cardForm.submitButton')

    fireEvent.change(titleInput, { target: { value: newPost.title } })
    fireEvent.change(contentInput, { target: { value: newPost.content } })
    fireEvent.click(submitButton)
    try {
      const errors = await screen.findAllByText('errors', { exact: false })
      expect(errors).toHaveLength(0)
    } catch (error) {
      expect(error.message.includes('Unable to find an element')).toEqual(true)
      expect(titleInput.value).toBe(newPost.title)
      expect(contentInput.value).toBe(newPost.content)
      expect(requestFunc).toHaveBeenCalled()
      expect(requestFunc).toHaveBeenCalledWith(newPost)
    }
  })
  test('Show errors for invalid data, no request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const titleInput = screen.getByTestId('title')
    const contentInput = screen.getByTestId('content')
    const submitButton = screen.getByText('cardForm.submitButton')

    fireEvent.change(titleInput, { target: { value: '' } })
    fireEvent.change(contentInput, { target: { value: '' } })
    fireEvent.click(submitButton)

    expect(titleInput.value).toBe('')
    expect(contentInput.value).toBe('')
    expect(await screen.findAllByText('errors', { exact: false })).toHaveLength(2)
    expect(requestFunc).not.toHaveBeenCalled()
  })
  test('Correct delete request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const deleteButton = screen.getByText('cardForm.deleteButton')

    fireEvent.click(deleteButton)
    await waitFor(() => {
      expect(requestFunc).toHaveBeenCalled()
    })
  })
})
