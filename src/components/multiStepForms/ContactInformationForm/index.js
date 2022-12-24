import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { InputFormComponent, DatePickerFormComponent } from 'components/formComponents'
import { actions } from 'ducks/multiStepForm/slice'
import { AddIcon } from 'components/icons/AddIcon'
import { dateFormat, Api } from 'constans'
import selectors from 'ducks/user/selectors'
import { getBase64 } from 'utils/getBase64'

import { contactsValidation } from '../validations'
import { BasicMultiStepForm } from '../BasicMultiStepForm'

import styles from './index.module.css'

const ContactInformationForm = () => {
  const [selectedImage, setSelectedImage] = useState()
  const dispatch = useDispatch()
  const user = useSelector(selectors.selectUser)
  const { t } = useTranslation()

  const onSubmitHandler = useCallback(
    async ({ name, lastName, birthdate, imageFile }) => {
      const userData = { name, lastName, birthdate: format(birthdate, dateFormat) }
      if (imageFile[0]) {
        const base64Avatar = await getBase64(imageFile[0])
        userData.avatar = base64Avatar.split(',')[1]
        userData.type = imageFile[0].type
      }
      dispatch(actions.contactInformationRequest(userData))
    },
    [dispatch],
  )

  const defaultValues = { ...user, birthdate: new Date(user.birthdate) }

  const methods = useForm({ defaultValues, resolver: yupResolver(contactsValidation) })

  const onImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage((previousValue) => {
        if (previousValue) {
          URL.revokeObjectURL(previousValue)
        }
        return URL.createObjectURL(file)
      })
    }
  }

  const avatarUrl = user.avatar ? `${process.env.REACT_APP_IMAGE_URL}${user.avatar}` : undefined

  return (
    <BasicMultiStepForm methods={methods} onSubmitHandler={onSubmitHandler}>
      <h1>{t('multiStepForm.contactInformation')}</h1>
      <div className={styles.namesContainer}>
        <div>
          <h2>{t('formFields.name')}*</h2>
          <InputFormComponent className={styles.textInput} name="name" data-testid="nameInput" />
        </div>
        <div>
          <h2>{t('formFields.lastName')}*</h2>
          <InputFormComponent
            name="lastName"
            className={styles.textInput}
            data-testid="lastNameInput"
          />
        </div>
      </div>
      <div className={styles.birthdateContainer}>
        <h2>{t('formFields.birthdate')}*</h2>
        <DatePickerFormComponent
          name="birthdate"
          className={styles.textInput}
          dateFormat={dateFormat}
          data-testid="birthdateInput"
        />
      </div>
      <h2>{t('formFields.avatar')}</h2>
      <div>
        {(selectedImage || user.avatar) && (
          <img src={selectedImage || avatarUrl} alt="avatar" className={styles.avatar} />
        )}
        <label htmlFor="imageFile">
          <div className={styles.imageBox}>
            <AddIcon className={styles.addIcon} />
          </div>
          <InputFormComponent
            name="imageFile"
            type="file"
            className={styles.imageUpload}
            id="imageFile"
            onChange={onImageChange}
          />
        </label>
      </div>
    </BasicMultiStepForm>
  )
}
export { ContactInformationForm }
