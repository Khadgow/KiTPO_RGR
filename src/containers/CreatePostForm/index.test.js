import React from 'react'

import { render, fireEvent, screen, servers } from 'testUtils'

import { CreatePostForm } from './index'

const setup = () => render(<CreatePostForm />)

const requestFunc = jest.fn()

const newPost = { title: 'Some title', content: 'Some content' }

const server = servers.createPostForm({
  requestFunc,
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('CreatePostForm', () => {
  test('No errors for valid data, correct request', async () => {
    setup()
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
})
