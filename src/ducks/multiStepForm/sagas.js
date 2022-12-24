import { all, put, takeLatest, select, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { actions as userActions } from 'ducks/user/slice'
import userSelectors from 'ducks/user/selectors'
import educationServices from 'ducks/education/services'
import experienceServices from 'ducks/experience/services'
import userLanguageServices from 'ducks/userLanguage/services'

import { actions } from './slice'

function* contactInformationSaga({ payload: { birthdate, name, lastName, avatar, type } }) {
  try {
    const currentUser = yield select(userSelectors.selectUser)
    yield put(userActions.updateUserByIdRequest({ birthdate, name, lastName, id: currentUser.id }))
    if (avatar) {
      yield put(userActions.updateUserAvatarRequest({ avatar, type, id: currentUser.id }))
    }
    yield put(actions.contactInformationSuccess())
  } catch (error) {
    yield put(actions.contactInformationError(error))
  }
}

function* educationInformationSaga({ payload }) {
  try {
    const user = yield select(userSelectors.selectUser)

    yield all(
      payload.newEducations.map((education) =>
        call(educationServices.createEducation, { ...education, userId: user.id }),
      ),
    )

    yield all(
      payload.updatedEducations.map((education) =>
        call(educationServices.updateEducation, { ...education, userId: user.id }),
      ),
    )

    yield all(
      payload.deletedEducations.map((id) =>
        call(educationServices.deleteEducation, { educationId: id, userId: user.id }),
      ),
    )

    yield put(actions.educationInformationSuccess())
  } catch (error) {
    yield put(actions.educationInformationError(error))
  }
}

function* experienceInformationSaga({ payload }) {
  try {
    const user = yield select(userSelectors.selectUser)
    yield all(
      payload.newExperiences.map((experience) =>
        call(experienceServices.createExperience, { ...experience, userId: user.id }),
      ),
    )

    yield all(
      payload.updatedExperiences.map((experience) =>
        call(experienceServices.updateExperience, { ...experience, userId: user.id }),
      ),
    )

    yield all(
      payload.deletedExperiences.map((id) =>
        call(experienceServices.deleteExperience, { experienceId: id, userId: user.id }),
      ),
    )
    yield put(actions.experienceInformationSuccess())
  } catch (error) {
    yield put(actions.experienceInformationError(error))
  }
}

function* languageInformationSaga({ payload }) {
  try {
    const user = yield select(userSelectors.selectUser)

    yield all(
      payload.newUserLanguages.map((language) =>
        call(userLanguageServices.addUserLanguage, { ...language, userId: user.id }),
      ),
    )

    yield all(
      payload.updatedUserLanguages.map((language) =>
        call(userLanguageServices.updateUserLanguage, { ...language, userId: user.id }),
      ),
    )

    yield put(actions.languageInformationSuccess())
    yield put(push('/'))
  } catch (error) {
    yield put(actions.languageInformationError(error))
  }
}

export default function* multiStepFormSagas() {
  yield all([
    takeLatest(actions.contactInformationRequest, contactInformationSaga),
    takeLatest(actions.educationInformationRequest, educationInformationSaga),
    takeLatest(actions.experienceInformationRequest, experienceInformationSaga),
    takeLatest(actions.languageInformationRequest, languageInformationSaga),
  ])
}
