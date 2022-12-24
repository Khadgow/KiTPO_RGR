import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import selectors from 'ducks/user/selectors'
import { BasicUserForm } from 'components/BasicUserForm'
import { actions } from 'ducks/user/slice'
import { Spinner } from 'components/Spinner/Spinner'
import { dateFormat, FormsValidation } from 'constans'
import { InputFormComponent, DatePickerFormComponent } from 'components/formComponents'
import { dateRefactor } from 'utils/dateRefactor'

export const UpdateProfileForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const loading = useSelector(selectors.selectLoading)

  useEffect(() => {
    if (id) {
      dispatch(actions.getUserByIdRequest(id))
    }
  }, [dispatch, id])

  const user = useSelector(id ? selectors.selectUserById : selectors.selectUser)

  const { email, name, lastName, birthdate } = user

  const onSubmitHandler = useCallback(
    (formData) => {
      const refactoredFormData = dateRefactor(formData)
      refactoredFormData.id = user.id
      if (!refactoredFormData.password) {
        delete refactoredFormData.password
      }
      dispatch(actions.updateUserByIdRequest(refactoredFormData))
    },
    [dispatch, user.id],
  )

  if (loading) {
    return <Spinner />
  }

  return (
    <BasicUserForm
      title="updateProfile.pageTitle"
      buttonText="updateProfile.submitButton"
      onSubmit={onSubmitHandler}
    >
      <h2>{t('formFields.email')}</h2>
      <InputFormComponent
        name="email"
        data-testid="email"
        options={{
          pattern: {
            value: FormsValidation.email,
            message: 'errors.email',
          },
          required: {
            value: true,
            message: 'errors.required',
          },
          value: email,
        }}
      />
      <h2>{t('formFields.password')}</h2>
      <InputFormComponent name="password" data-testid="password" type="password" />
      <h2>{t('formFields.name')}</h2>
      <InputFormComponent
        name="name"
        data-testid="name"
        options={{
          value: name,
        }}
      />
      <h2>{t('formFields.lastName')}</h2>
      <InputFormComponent
        name="lastName"
        data-testid="lastName"
        options={{
          value: lastName,
        }}
      />
      <h2>{t('formFields.birthdate')}</h2>
      <DatePickerFormComponent
        name="birthdate"
        data-testid="birthdate"
        defaultValue={birthdate ? new Date(Date.parse(birthdate)) : null}
        dateFormat={dateFormat}
      />
    </BasicUserForm>
  )
}
