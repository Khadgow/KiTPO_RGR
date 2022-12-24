import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import userSelectors from 'ducks/user/selectors'
import { Routes, Roles } from 'constans'

import styles from './index.module.css'

export const Navbar = () => {
  const role = useSelector(userSelectors.selectRole)
  const { t } = useTranslation()

  return (
    <div className={styles.navbar}>
      {role === Roles.admin && <Link to={Routes.USERS}>{t('cardList.usersPage')}</Link>}
      <Link to={Routes.PROFILE}>{t('cardList.profilePage')}</Link>
      <Link to={Routes.MULTI_STEP_FORM}>{t('cardList.multiStepForm')}</Link>
    </div>
  )
}
