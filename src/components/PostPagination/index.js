import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import selectors from 'ducks/posts/selectors'
import { actions } from 'ducks/posts/slice'

import styles from './index.module.css'

export const PostPagination = () => {
  const page = useSelector(selectors.selectPostsPage)
  const lastPage = useSelector(selectors.selectLastPostsPage)
  const dispatch = useDispatch()

  const onIncrement = useCallback(() => {
    dispatch(actions.setPostsPage(page + 1))
  }, [dispatch, page])

  const onDecrement = useCallback(() => {
    dispatch(actions.setPostsPage(page - 1))
  }, [dispatch, page])

  return (
    <div className={styles.postsPageContainer}>
      {page !== 1 && (
        <button className={styles.postsPageArrow} onClick={onDecrement} type="button">
          {'<'}
        </button>
      )}
      <p className={styles.postsPageCount}>{page}</p>
      {page !== lastPage && (
        <button className={styles.postsPageArrow} onClick={onIncrement} type="button">
          {'>'}
        </button>
      )}
    </div>
  )
}
