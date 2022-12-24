import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty } from 'lodash'
import Select from 'react-select'

import { actions as multiStepFormActions } from 'ducks/multiStepForm/slice'
import { actions as languageActions } from 'ducks/language/slice'
import { actions as userLanguageActions } from 'ducks/userLanguage/slice'
import { NumberInputFormComponent } from 'components/formComponents'
import languageSelectors from 'ducks/language/selectors'
import userSelectors from 'ducks/user/selectors'
import userLanguageSelectors from 'ducks/userLanguage/selectors'
import { Spinner } from 'components/Spinner/Spinner'

import { languagesValidation } from '../validations'
import { BasicMultiStepForm } from '../BasicMultiStepForm'

import styles from './index.module.css'

const levelLimit = ({ floatValue, value }) => (!floatValue || floatValue <= 5) && value.length < 2

export const LanguagesForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isLanguagesLoading = useSelector(languageSelectors.selectLoading)
  const languages = useSelector(languageSelectors.selectAllLanguages)
  const isUserLanguagesLoading = useSelector(userLanguageSelectors.selectLoading)
  const initialUserLanguages = useSelector(userLanguageSelectors.selectUserLanguages)
  const user = useSelector(userSelectors.selectUser)

  const [selectedLanguage, setSelectedLanguage] = useState()

  const methods = useForm({ resolver: yupResolver(languagesValidation(languages?.length)) })
  const { control, formState, setValue } = methods

  const { fields, append, remove } = useFieldArray({ name: 'languages', control })

  useEffect(() => {
    dispatch(languageActions.getAllLanguagesRequest())
    dispatch(userLanguageActions.getUserLanguagesRequest({ userId: user.id }))
  }, [dispatch, user.id])

  useEffect(() => {
    if (!isEmpty(initialUserLanguages?.data)) {
      setValue(
        'languages',
        Object.values(initialUserLanguages.data).map((language) => ({
          ...language,
          languageId: language.id,
        })),
      )
    }
  }, [initialUserLanguages, setValue])

  const options = languages
    ?.filter(({ id }) => !fields.find(({ languageId }) => languageId === id))
    ?.map(({ id, name }) => ({ label: name, value: id }))

  const onSubmitHandler = useCallback(
    (formData) => {
      const newUserLanguages = formData.languages.filter(({ id }) => !initialUserLanguages.data[id])

      const updatedUserLanguages = formData.languages.filter(
        ({ id, level }) => id && initialUserLanguages.data?.[id]?.level !== level,
      )
      dispatch(
        multiStepFormActions.languageInformationRequest({ newUserLanguages, updatedUserLanguages }),
      )
    },
    [dispatch, initialUserLanguages.data],
  )

  const onSelectChange = useCallback((value) => {
    setSelectedLanguage(value)
  }, [])

  const onAdd = () => {
    const languageToAdd = languages.find(({ id }) => id === selectedLanguage.value)
    if (languageToAdd) {
      append({
        code: languageToAdd.code,
        name: languageToAdd.name,
        level: undefined,
        languageId: languageToAdd.id,
      })
      setSelectedLanguage(null)
    }
  }

  return (
    <BasicMultiStepForm methods={methods} onSubmitHandler={onSubmitHandler}>
      <h1>{t('multiStepForm.languages')}</h1>
      <div className={styles.addLanguageContainer} data-testid="selectorContainer">
        <Select
          value={selectedLanguage}
          options={options}
          disabled={isLanguagesLoading}
          isLoading={isLanguagesLoading}
          onChange={onSelectChange}
          isClearable
          data-testid="selector"
        />
        <button
          onClick={onAdd}
          disabled={!options?.length || !selectedLanguage}
          className={styles.addButton}
          type="button"
        >
          {t('formFields.add')}
        </button>
      </div>
      {formState?.errors?.languages && (
        <div className={styles.error}>{t(formState.errors.languages.message)}</div>
      )}
      {!isUserLanguagesLoading && !isLanguagesLoading ? (
        fields.map((field, index) => (
          <div key={field.id} className={styles.languageContainer} data-testid="languageContainer">
            <div style={{ width: '50px' }}>{field.name}</div>
            <div className={styles.inputContainer}>
              <NumberInputFormComponent
                name={`languages.${index}.level`}
                className={styles.levelInput}
                isAllowed={levelLimit}
                allowNegative={false}
                data-testid="level"
              />
            </div>
            <button
              onClick={() => remove(index)}
              type="button"
              className={styles.dropButton}
              data-testid="drop"
            >
              {t('formFields.drop')}
            </button>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </BasicMultiStepForm>
  )
}
