import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Routes } from 'constans'
import { BasicPostForm } from 'components/BasicPostForm'
import { actions } from 'ducks/posts/slice'
import { TextareaFormComponent, InputFormComponent } from 'components/formComponents'

export const CreatePostForm = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSubmit = useCallback(
    (formData) => {
      dispatch(actions.createPostRequest(formData))
      history.push(Routes.ROOT)
    },
    [dispatch, history],
  )

  return (
    <BasicPostForm onSubmit={handleSubmit} pageTitle="createCard.pageTitle">
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
        }}
      />
    </BasicPostForm>
  )
}
