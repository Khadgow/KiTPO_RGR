import React from 'react'
import { useTranslation } from 'react-i18next'

export const UserProfileInfo = ({ name, email, role, lastName, birthdate }) => {
  const { t } = useTranslation()

  return (
    <>
      <p>
        {t('formFields.name')}: {name}
      </p>
      {lastName && (
        <p>
          {t('formFields.lastName')}: {lastName}
        </p>
      )}
      <p>
        {t('formFields.email')}: {email}
      </p>
      <p>
        {t('formFields.role')}: {role}
      </p>
      {birthdate && (
        <p>
          {t('formFields.birthdate')}: {birthdate}
        </p>
      )}
    </>
  )
}
