import React, { useCallback, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import selectors from 'ducks/posts/selectors'
import { actions } from 'ducks/posts/slice'
import { BasicPostForm } from 'components/BasicPostForm'
import { Spinner } from 'components/Spinner/Spinner'
import { InputFormComponent, TextareaFormComponent } from 'components/formComponents'

export const EditPostForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const post = useSelector(selectors.selectPostById)
  const loading = useSelector(selectors.selectLoading)

  useEffect(() => {
    dispatch(actions.getPostByIdRequest(id))
  }, [dispatch, id])

  const deleteButtonHandler = useCallback(
    (event) => {
      event.preventDefault()
      dispatch(actions.deletePostRequest(post.id))
      history.push('/')
    },
    [dispatch, history, post.id],
  )

  const onSubmitHandler = useCallback(
    (formData) => {
      const editedPost = {
        ...post,
        ...formData,
      }
      dispatch(actions.editPostRequest(editedPost))
      history.push('/')
    },
    [dispatch, history, post],
  )

  if (loading) {
    return <Spinner />
  }

  return (
    <BasicPostForm onSubmit={onSubmitHandler} onDelete={deleteButtonHandler}>
      <h2>{t('formFields.title')}</h2>
      <InputFormComponent
        name="title"
        data-testid="title"
        options={{
          minLength: {
            value: 5,
            message: 'errors.minError',
          },
          maxLength: {
            value: 255,
            message: 'errors.maxError',
          },
          required: {
            value: true,
            message: 'errors.required',
          },
          value: post.title,
        }}
      />
      <h2>{t('formFields.content')}</h2>
      <TextareaFormComponent
        name="content"
        data-testid="content"
        options={{
          minLength: {
            value: 5,
            message: 'errors.minError',
          },
          maxLength: {
            value: 255,
            message: 'errors.maxError',
          },
          required: {
            value: true,
            message: 'errors.required',
          },
          value: post.content,
        }}
      />
    </BasicPostForm>
  )
}
