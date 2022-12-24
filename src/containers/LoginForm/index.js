import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { BasicUserForm } from 'components/BasicUserForm'
import { actions } from 'ducks/user/slice'
import { Routes, FormsValidation } from 'constans'
import { InputFormComponent } from 'components/formComponents'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const onSubmitHandler = useCallback(
    (formData) => {
      dispatch(actions.loginRequest(formData))
    },
    [dispatch],
  )

  return (
    <BasicUserForm
      title="loginPage.pageTitle"
      buttonText="loginPage.submitButton"
      onSubmit={onSubmitHandler}
      redirectPath={Routes.REGISTER}
      redirectText="loginPage.redirectText"
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
        }}
      />
      <h2>{t('formFields.password')}</h2>
      <InputFormComponent
        name="password"
        data-testid="password"
        options={{
          required: {
            value: true,
            message: 'errors.required',
          },
        }}
        type="password"
      />
    </BasicUserForm>
  )
}
