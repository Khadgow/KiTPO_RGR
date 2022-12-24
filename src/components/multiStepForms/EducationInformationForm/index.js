import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty, isEqual } from 'lodash'
import {
  format,
  isAfter,
  isBefore,
  closestTo,
  subYears,
  addYears,
  intervalToDuration,
} from 'date-fns'

import { actions as multiStepFormActions } from 'ducks/multiStepForm/slice'
import { actions as educationActions } from 'ducks/education/slice'
import { InputFormComponent, DatePickerFormComponent } from 'components/formComponents'
import educationSelectors from 'ducks/education/selectors'
import userSelectors from 'ducks/user/selectors'
import { dateFormat } from 'constans'
import { Spinner } from 'components/Spinner/Spinner'

import { educationsValidation } from '../validations'
import { BasicMultiStepForm } from '../BasicMultiStepForm'

import styles from './index.module.css'

const EducationInformationForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isEducationsLoading = useSelector(educationSelectors.selectLoading)
  const initialEducations = useSelector(educationSelectors.selectAllEducations)
  const user = useSelector(userSelectors.selectUser)

  useEffect(() => {
    dispatch(educationActions.getAllEducationsRequest({ userId: user.id }))
  }, [dispatch, user.id])

  const methods = useForm({
    resolver: yupResolver(educationsValidation),
  })
  const { control, setValue, formState } = methods

  useEffect(() => {
    if (!isEmpty(initialEducations?.data)) {
      const newEducations = Object.values(initialEducations.data).map(
        ({ isCurrent, enrolledOn, graduatedOn, ...rest }) => ({
          ...rest,
          enrolledOn: new Date(enrolledOn),
          graduatedOn: isCurrent ? new Date() : new Date(graduatedOn),
        }),
      )
      setValue('educations', newEducations)
    }
  }, [initialEducations, setValue])

  const { fields, append, remove } = useFieldArray({ name: 'educations', control })

  const onSubmitHandler = useCallback(
    ({ educations }) => {
      const refactoredEducations = educations.map(
        ({ isCurrent, enrolledOn, graduatedOn, ...rest }) => ({
          ...rest,
          isCurrent,
          enrolledOn: format(enrolledOn, dateFormat),
          graduatedOn: isCurrent ? undefined : format(graduatedOn, dateFormat),
        }),
      )
      const newEducations = refactoredEducations.filter((education) => !education.id)
      const existedEducations = refactoredEducations.filter((education) => !!education.id)
      const updatedEducations = existedEducations.filter(
        (education) => !isEqual(education, initialEducations.data[education.id]),
      )
      const deletedEducations = initialEducations.ids.filter(
        (id) => !existedEducations.find((education) => id === education.id),
      )

      dispatch(
        multiStepFormActions.educationInformationRequest({
          newEducations,
          updatedEducations,
          deletedEducations,
        }),
      )
    },
    [dispatch, initialEducations],
  )

  const educations = useWatch({ control, name: 'educations' })

  const birthdate = new Date(user.birthdate)

  const educationsIntervals = educations
    ?.filter(({ enrolledOn, graduatedOn }) => enrolledOn && graduatedOn)
    .map(({ enrolledOn, graduatedOn }) => ({
      start: enrolledOn,
      end: graduatedOn,
    }))

  const excludeDateIntervals = educations?.reduce((acc, { id }, _, educationsArray) => {
    acc[id] = educationsArray
      .filter(
        ({ enrolledOn, graduatedOn, id: educationId }) =>
          enrolledOn &&
          graduatedOn &&
          intervalToDuration({ start: enrolledOn, end: graduatedOn }).years >= 2 &&
          id !== educationId,
      )
      .map(({ enrolledOn, graduatedOn }) => ({
        start: addYears(enrolledOn, 1),
        end: subYears(graduatedOn, 1),
      }))
    return acc
  }, {})

  const nearestAfter = (enrolledOn) => {
    const intervalDates = educationsIntervals
      .filter(({ start }) => isAfter(start, enrolledOn))
      ?.map(({ start }) => start)

    if (!intervalDates.length) {
      return new Date()
    }

    return closestTo(enrolledOn, intervalDates)
  }

  const nearestBefore = (graduatedOn, defaultReturn) => {
    const intervalDates = educationsIntervals
      .filter(({ end }) => isBefore(end, graduatedOn))
      ?.map(({ end }) => end)

    if (!intervalDates.length) {
      return defaultReturn
    }

    return closestTo(graduatedOn, intervalDates)
  }

  const disabledDates = educations?.map(({ enrolledOn, graduatedOn }) => ({
    enrolledOn: {
      minDate: graduatedOn ? nearestBefore(graduatedOn, birthdate) : birthdate,
      maxDate: graduatedOn || new Date(),
    },
    graduatedOn: {
      minDate: enrolledOn || birthdate,
      maxDate: enrolledOn ? nearestAfter(enrolledOn) : new Date(),
    },
  }))

  useEffect(() => {
    if (
      educations?.[educations.length - 1]?.isCurrent &&
      educations?.[educations.length - 1]?.graduatedOn?.getFullYear() !== new Date().getFullYear()
    ) {
      setValue(`educations.${educations.length - 1}.graduatedOn`, new Date())
    }
  }, [educations, setValue])

  if (isEducationsLoading) {
    return <Spinner />
  }

  return (
    <BasicMultiStepForm methods={methods} onSubmitHandler={onSubmitHandler}>
      <h1>{t('multiStepForm.education')}</h1>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.container} data-testid="educationContainer">
          <button
            onClick={() => remove(index)}
            type="button"
            className={styles.dropButton}
            data-testid="drop"
          >
            {t('formFields.drop')}
          </button>
          <div>
            <h2>{t('formFields.schoolName')}</h2>
            <InputFormComponent
              name={`educations.${index}.institution`}
              className={styles.textInput}
              data-testid="institution"
            />
          </div>
          <div className={styles.durationContainer}>
            <div>
              <h2>{t('formFields.startYear')}</h2>
              <DatePickerFormComponent
                name={`educations.${index}.enrolledOn`}
                className={styles.textInput}
                dateFormat="yyyy"
                showYearPicker
                excludeDateIntervals={excludeDateIntervals?.[field.id]}
                data-testid="enrolledOn"
                {...disabledDates?.[index]?.enrolledOn}
              />
            </div>
            <div>
              <h2>{t('formFields.endYear')}</h2>
              <DatePickerFormComponent
                name={`educations.${index}.graduatedOn`}
                className={styles.textInput}
                dateFormat="yyyy"
                showYearPicker
                disabled={educations?.[index]?.isCurrent}
                excludeDateIntervals={excludeDateIntervals?.[field.id]}
                data-testid="graduatedOn"
                {...disabledDates?.[index]?.graduatedOn}
              />
            </div>
            <div>
              <h2>{t('formFields.now')}</h2>
              <InputFormComponent
                name={`educations.${index}.isCurrent`}
                type="checkbox"
                className={styles.checkbox}
                data-testid="isCurrent"
              />
            </div>
          </div>
          {formState?.errors?.educations?.[index]?.type === 'intervalsOverlapping' && (
            <div>{t(formState.errors.educations[index].message)}</div>
          )}
          {index !== fields.length - 1 && <hr />}
        </div>
      ))}
      <button
        className={styles.addButton}
        disabled={educations?.[educations.length - 1]?.isCurrent || fields.length === 5}
        onClick={() =>
          append({
            institution: '',
            enrolledOn: undefined,
            graduatedOn: undefined,
          })
        }
        type="button"
      >
        {t('formFields.add')}
      </button>
    </BasicMultiStepForm>
  )
}
export { EducationInformationForm }
