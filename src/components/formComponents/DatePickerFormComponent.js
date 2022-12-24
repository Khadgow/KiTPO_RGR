import React, { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useBaseInputFormAdapter } from 'hooks/baseInputFormAdapterHook'
import { DatePickerComponent } from 'components/Inputs/DatePickerComponent/DatePickerComponent'

import styles from './index.module.css'

const CustomInput = forwardRef((props, ref) => <input ref={ref} {...props} />)

export const DatePickerFormComponent = ({
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
      <DatePickerComponent
        onChange={field.onChange}
        selected={field.value}
        className={className}
        customInput={<CustomInput data-testid={restProps['data-testid']} />}
        {...restProps}
      />
      {error && <div className={styles.error}>{t(error.message)}</div>}
    </>
  )
}
