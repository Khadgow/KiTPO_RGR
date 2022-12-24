import NumberFormat from 'react-number-format'
import React from 'react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useBaseInputFormAdapter } from 'hooks/baseInputFormAdapterHook'

import styles from './index.module.css'

export const NumberInputFormComponent = ({
  name,
  defaultValue,
  className,
  dateFormatOnChange,
  ...restProps
}) => {
  const { control, error } = useBaseInputFormAdapter({ name })
  const { field } = useController({ defaultValue, name, control })
  const { t } = useTranslation()
  return (
    <>
      <NumberFormat
        onValueChange={({ floatValue }) => field.onChange(floatValue)}
        value={field.value}
        className={className}
        {...restProps}
      />
      {error && <div className={styles.error}>{t(error.message)}</div>}
    </>
  )
}
