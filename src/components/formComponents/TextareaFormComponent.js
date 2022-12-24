import React from 'react'
import { useTranslation } from 'react-i18next'

import { useBaseInputFormAdapter } from 'hooks/baseInputFormAdapterHook'
import { TextareaComponent } from 'components/Inputs/TextareaComponent/TextareaComponent'

import styles from './index.module.css'

export const TextareaFormComponent = ({ name, options, ...restProps }) => {
  const { register, error } = useBaseInputFormAdapter({ name, ...restProps })
  const { t } = useTranslation()
  return (
    <>
      <TextareaComponent {...restProps} {...register(name, options)} />
      {error && <div className={styles.error}>{t(error.message)}</div>}
    </>
  )
}
