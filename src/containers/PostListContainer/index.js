import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generatePath } from 'react-router'
import { useTranslation } from 'react-i18next'

import { AddCardComponent } from 'components/AddCardComponent'
import { Roles, Routes } from 'constans'
import postsSelectors from 'ducks/posts/selectors'
import { actions } from 'ducks/posts/slice'
import { PostPagination } from 'components/PostPagination'
import { Navbar } from 'components/Navbar'
import { PostComponent } from 'components/PostComponent'
import { Spinner } from 'components/Spinner/Spinner'

import styles from './index.module.css'

export const PostListContainer = ({ role }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const addButtonHandler = useCallback(() => history.push(Routes.CREATE), [history])

  const posts = useSelector(postsSelectors.selectPosts)
  const isLoading = useSelector(postsSelectors.selectLoading)

  useEffect(() => {
    dispatch(actions.getAllPostsRequest())
  }, [dispatch])

  const editButtonHandler = useCallback(
    (id) => () => {
      history.push(generatePath(Routes.INFO, { id }))
    },
    [history],
  )

  const likeButtonHandler = useCallback(
    (id) => () => {
      dispatch(actions.likePostRequest(id))
    },
    [dispatch],
  )
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Navbar />
      <h1>{t('cardList.pageTitle')}</h1>
      <div className={styles.cardList}>
        {role === Roles.admin && <AddCardComponent onClick={addButtonHandler} />}
        {posts.map((post) => (
          <PostComponent
            key={post.id}
            post={post}
            role={role}
            editButtonHandler={editButtonHandler}
            likeButtonHandler={likeButtonHandler}
          />
        ))}
      </div>
      <PostPagination />
    </>
  )
}
