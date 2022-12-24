import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { BasicFormComponent } from '../BasicFormComponent/BasicFormComponent'

import styles from './index.module.css'

export const BasicUserForm = ({
  children,
  title,
  buttonText,
  onSubmit,
  redirectText,
  redirectPath,
}) => {
  const { t } = useTranslation()
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1>{t(title)}</h1>
        <div>
          <BasicFormComponent data-testid="form" onSubmit={onSubmit}>
            {children}
            <button data-testid="submit" className={styles.submitButton} type="submit">
              {t(buttonText)}
            </button>
          </BasicFormComponent>
          {redirectPath && <Link to={redirectPath}>{t(redirectText)}</Link>}
        </div>
      </div>
    </div>
  )
}
