import React from 'react'
import { fireEvent } from '@testing-library/react'

import { render, screen, waitForElementToBeRemoved } from 'testUtils'
import { Roles } from 'constans'

import { PostComponent } from './index'

const editHandler = jest.fn()
const likeHandler = jest.fn()

const mockedPost = {
  title: 'admin post',
  content: 'content',
  liked: true,
  id: 1,
  totalLikes: 2,
}

const setupForAdmin = () =>
  render(
    <PostComponent
      role={Roles.admin}
      editButtonHandler={editHandler}
      likeButtonHandler={likeHandler}
      post={mockedPost}
    />,
  )

const setupForUser = () =>
  render(<PostComponent role={Roles.user} post={mockedPost} likeButtonHandler={likeHandler} />)

describe('PostComponent', () => {
  test('Correct post card for admin', async () => {
    setupForAdmin()

    const editButton = screen.getByTestId('editButton')
    const likeButton = screen.getByTestId('likeButton')

    expect(editButton).toBeInTheDocument()
    expect(likeButton).toBeInTheDocument()

    fireEvent.click(editButton)
    fireEvent.click(likeButton)

    expect(editHandler).toHaveBeenCalled()
    expect(likeHandler).toHaveBeenCalled()
    expect(editHandler).toHaveBeenCalledWith(mockedPost.id)
    expect(likeHandler).toHaveBeenCalledWith(mockedPost.id)
  })

  test('Correct post card for user', async () => {
    setupForUser()

    const editButton = screen.queryByTestId('editButton')
    const likeButton = screen.getByTestId('likeButton')

    expect(editButton).toBe(null)
    expect(likeButton).toBeInTheDocument()

    fireEvent.click(likeButton)
    expect(editHandler).not.toHaveBeenCalled()
    expect(likeHandler).toHaveBeenCalled()
    expect(likeHandler).toHaveBeenCalledWith(mockedPost.id)
  })
})
