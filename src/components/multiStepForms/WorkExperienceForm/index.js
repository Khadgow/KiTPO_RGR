import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { isEqual, isEmpty } from 'lodash'

import { InputFormComponent, DatePickerFormComponent } from 'components/formComponents'
import { actions as experiencenActions } from 'ducks/experience/slice'
import { actions as multiStepFormActions } from 'ducks/multiStepForm/slice'
import userSelectors from 'ducks/user/selectors'
import experienceSelectors from 'ducks/experience/selectors'
import { dateFormat } from 'constans'
import { Spinner } from 'components/Spinner/Spinner'

import { experiencesValidation } from '../validations'
import { BasicMultiStepForm } from '../BasicMultiStepForm'

import styles from './index.module.css'

export const WorkExperienceForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isExperiencesLoading = useSelector(experienceSelectors.selectLoading)
  const initialExperiences = useSelector(experienceSelectors.selectAllExperiences)
  const user = useSelector(userSelectors.selectUser)

  useEffect(() => {
    dispatch(experiencenActions.getAllExperiencesRequest({ userId: user.id }))
  }, [dispatch, user.id])

  const methods = useForm({ resolver: yupResolver(experiencesValidation) })
  const { control, formState, setValue } = methods

  const { fields, append, remove } = useFieldArray({ name: 'experiences', control })

  useEffect(() => {
    if (!isEmpty(initialExperiences?.data)) {
      const newExperiences = Object.values(initialExperiences.data).map(
        ({ hiredOn, quitOn, isCurrent, ...rest }) => ({
          ...rest,
          isCurrent,
          hiredOn: new Date(hiredOn),
          quitOn: isCurrent ? undefined : new Date(quitOn),
        }),
      )
      setValue('experiences', newExperiences)
    }
  }, [initialExperiences, setValue])

  const onSubmitHandler = useCallback(
    ({ experiences }) => {
      const refactoredExperiences = experiences.map(({ hiredOn, quitOn, isCurrent, ...rest }) => ({
        ...rest,
        hiredOn: format(hiredOn, dateFormat),
        quitOn: isCurrent ? undefined : format(quitOn, dateFormat),
        isCurrent,
      }))
      const newExperiences = refactoredExperiences.filter((experience) => !experience.id)
      const alreadyCreatedExperiences = refactoredExperiences.filter(
        (experience) => !!experience.id,
      )
      const updatedExperiences = alreadyCreatedExperiences.filter(
        (experience) => !isEqual(experience, initialExperiences.data[experience.id]),
      )
      const deletedExperiences = initialExperiences.ids.filter(
        (id) => !alreadyCreatedExperiences.find((experience) => id === experience.id),
      )
      dispatch(
        multiStepFormActions.experienceInformationRequest({
          newExperiences,
          updatedExperiences,
          deletedExperiences,
        }),
      )
    },
    [dispatch, initialExperiences],
  )

  const experiences = useWatch({ control, name: 'experiences' })

  const birthdate = new Date(user.birthdate)

  const disabledDates = experiences?.map(({ hiredOn, quitOn }) => ({
    hiredOn: {
      minDate: birthdate,
      maxDate: quitOn || new Date(),
    },
    quitOn: {
      minDate: hiredOn || birthdate,
      maxDate: new Date(),
    },
  }))

  if (isExperiencesLoading) {
    return <Spinner />
  }

  return (
    <BasicMultiStepForm methods={methods} onSubmitHandler={onSubmitHandler}>
      <h1>{t('multiStepForm.experiences')}</h1>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.container} data-testid="experienceContainer">
          <button
            onClick={() => remove(index)}
            type="button"
            className={styles.dropButton}
            data-testid="drop"
          >
            {t('formFields.drop')}
          </button>
          <div>
            <h2>{t('formFields.companyName')}</h2>
            <InputFormComponent
              name={`experiences.${index}.companyName`}
              className={styles.textInput}
              data-testid="companyName"
            />
          </div>
          <div>
            <h2>{t('formFields.profile')}</h2>
            <InputFormComponent
              name={`experiences.${index}.position`}
              className={styles.textInput}
              data-testid="position"
            />
          </div>
          <div className={styles.durationContainer}>
            <div>
              <h2>{t('formFields.startYear')}</h2>
              <DatePickerFormComponent
                name={`experiences.${index}.hiredOn`}
                className={styles.textInput}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                {...disabledDates?.[index]?.hiredOn}
                data-testid="hiredOn"
              />
            </div>
            <div>
              <h2>{t('formFields.endYear')}</h2>
              <DatePickerFormComponent
                name={`experiences.${index}.quitOn`}
                className={styles.textInput}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                {...disabledDates?.[index]?.quitOn}
                data-testid="quitOn"
              />
            </div>
            <div>
              <h2>{t('formFields.now')}</h2>
              <InputFormComponent
                name={`experiences.${index}.isCurrent`}
                type="checkbox"
                className={styles.checkbox}
                data-testid="isCurrent"
              />
            </div>
          </div>
          {formState?.errors?.experiences?.[index]?.type === 'intervalsOverlapping' && (
            <div>{t(formState.errors.experiences[index].message)}</div>
          )}
          {index !== fields.length - 1 && <hr />}
        </div>
      ))}
      <button
        className={styles.addButton}
        onClick={() =>
          append({
            companyName: '',
            position: '',
            hiredOn: undefined,
            quitOn: undefined,
          })
        }
        disabled={fields.length === 10}
        type="button"
      >
        {t('formFields.add')}
      </button>
    </BasicMultiStepForm>
  )
}
