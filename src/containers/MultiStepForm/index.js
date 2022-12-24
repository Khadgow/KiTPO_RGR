import React from 'react'
import { useSelector } from 'react-redux'

import { LanguagesForm } from 'components/multiStepForms/LanguagesForm'
import { WorkExperienceForm } from 'components/multiStepForms/WorkExperienceForm'
import { EducationInformationForm } from 'components/multiStepForms/EducationInformationForm'
import { ContactInformationForm } from 'components/multiStepForms/ContactInformationForm'
import selectors from 'ducks/multiStepForm/selectors'

import styles from './index.module.css'

export const MultiStepForm = () => {
  const step = useSelector(selectors.selectStep)

  return (
    <div className={styles.container}>
      {step === 0 && <ContactInformationForm />}
      {step === 1 && <EducationInformationForm />}
      {step === 2 && <WorkExperienceForm />}
      {step === 3 && <LanguagesForm />}
    </div>
  )
}
