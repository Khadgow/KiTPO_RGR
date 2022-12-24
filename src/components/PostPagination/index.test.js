import React, { useEffect } from 'react'
import { fireEvent } from '@testing-library/react'
import { useDispatch } from 'react-redux'

import { render, screen } from 'testUtils'
import { actions } from 'ducks/posts/slice'

import { PostPagination } from './index'

const PaginationWithPostsLoading = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getAllPostsSuccess({ posts: [], meta: { lastPage: 3 } }))
  }, [dispatch])
  return <PostPagination />
}

const setup = () => render(<PaginationWithPostsLoading />)

describe('PostPagination', () => {
  test('Correct page increment', async () => {
    setup()

    const nextButton = screen.getByText('>')

    expect(nextButton).toBeInTheDocument()

    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    const pageCount = screen.getByText('3')
    expect(pageCount).toBeInTheDocument()

    expect(nextButton).not.toBeInTheDocument()

    const backButton = screen.getByText('<')
    expect(backButton).toBeInTheDocument()
  })
})
