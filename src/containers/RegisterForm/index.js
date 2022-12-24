import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { BasicUserForm } from 'components/BasicUserForm'
import { Routes, FormsValidation } from 'constans'
import { actions } from 'ducks/user/slice'
import { InputFormComponent, DatePickerFormComponent } from 'components/formComponents'
import { dateRefactor } from 'utils/dateRefactor'

export const RegisterForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const onSubmitHandler = useCallback(
    (formData) => {
      const refactoredFormData = dateRefactor(formData)

      dispatch(actions.registerRequest(refactoredFormData))
    },
    [dispatch],
  )

  return (
    <BasicUserForm
      title="registerPage.pageTitle"
      buttonText="registerPage.submitButton"
      onSubmit={onSubmitHandler}
      redirectPath={Routes.LOGIN}
      redirectText="registerPage.redirectText"
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
      <h2>{t('formFields.name')}</h2>
      <InputFormComponent name="name" data-testid="name" />
      <h2>{t('formFields.lastName')}</h2>
      <InputFormComponent name="lastName" data-testid="lastName" />
      <h2>{t('formFields.birthdate')}</h2>
      <DatePickerFormComponent name="birthdate" data-testid="birthdate" defaultValue={new Date()} />
    </BasicUserForm>
  )
}
