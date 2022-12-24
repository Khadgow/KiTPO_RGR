import React from 'react'
import { useTranslation } from 'react-i18next'

import { useBaseInputFormAdapter } from 'hooks/baseInputFormAdapterHook'
import { InputComponent } from 'components/Inputs/TextInputComponent/InputComponent'

import styles from './index.module.css'

export const InputFormComponent = ({
  name,
  type = 'text',
  options,
  className,
  id,
  onChange,
  ...restProps
}) => {
  const { register, error } = useBaseInputFormAdapter({ name, ...restProps })
  const { t } = useTranslation()
  const { onChange: registerOnChange, ...restRegister } = register(name, options)
  const handleOnChange = (event) => {
    registerOnChange(event)
    onChange?.(event)
  }
  return (
    <>
      <InputComponent
        {...restRegister}
        {...restProps}
        onChange={handleOnChange}
        type={type}
        className={className}
        id={id}
      />
      {error && <div className={styles.error}>{t(error.message)}</div>}
    </>
  )
}
