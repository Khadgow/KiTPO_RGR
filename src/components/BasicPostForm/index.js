import React from 'react'
import { useTranslation } from 'react-i18next'

import { BasicFormComponent } from '../BasicFormComponent/BasicFormComponent'

import styles from './index.module.css'

export const BasicPostForm = ({ onSubmit, pageTitle, onDelete, children }) => {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t(pageTitle)}</h1>
      <div className={styles.basicInputCard}>
        <BasicFormComponent onSubmit={onSubmit}>
          {children}
          <div>
            <button type="submit">{t('cardForm.submitButton')}</button>
            {onDelete && (
              <button onClick={onDelete} type="button">
                {t('cardForm.deleteButton')}
              </button>
            )}
          </div>
        </BasicFormComponent>
      </div>
    </>
  )
}
