import React from 'react'
import { useTranslation } from 'react-i18next'

import styles from './index.module.css'

export const FormStepper = ({ maxStep, step, onDecrement, onIncrement }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.buttonsContainer}>
      <button
        type="button"
        disabled={step === 0}
        onClick={onDecrement}
        className={styles.backButton}
      >
        {t('formStepper.back')}
      </button>
      <button
        type="submit"
        className={styles.nextButton}
        onClick={onIncrement}
        data-testid="nextButton"
      >
        {step === maxStep ? t('formStepper.submit') : t('formStepper.nextStep')}
      </button>
    </div>
  )
}
