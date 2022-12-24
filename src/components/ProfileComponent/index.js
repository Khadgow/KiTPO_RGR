import React from 'react'
import { useTranslation } from 'react-i18next'

import { UserProfileInfo } from '../UserProfileInfo'

export const ProfileComponent = ({ updateButtonHandler, ...user }) => {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('profilePage.pageTitle')}</h1>
      <UserProfileInfo {...user} />
      <button onClick={updateButtonHandler} type="button">
        {t('profilePage.updateButton')}
      </button>
    </>
  )
}
