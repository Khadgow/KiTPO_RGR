import { all, put, call, takeLatest } from 'redux-saga/effects'
import { normalize, schema } from 'normalizr'

import { actions } from './slice'
import services from './services'

const languagesSchema = new schema.Entity('languages')
const normalizeSchema = { languages: [languagesSchema] }

function* getUserLanguagesSaga({ payload }) {
  try {
    const userLanguagesResponse = yield call(services.getUserLanguages, payload.userId)
    const { entities, result } = normalize(userLanguagesResponse.data.data, normalizeSchema)
    yield put(actions.getUserLanguagesSuccess({ data: entities.languages, ids: result.languages }))
  } catch (error) {
    yield put(actions.getUserLanguagesError(error))
  }
}

function* addUserLanguageSaga({ payload }) {
  try {
    call(services.addUserLanguage, { userId: payload.userId, language: payload.language })
    yield put(actions.getAllUserLanguages(payload.userId))
    yield put(actions.addUserLanguageSuccess())
  } catch (error) {
    yield put(actions.addUserLanguageError(error))
  }
}

function* updateUserLanguageSaga({ payload }) {
  try {
    call(services.updateUserLanguage, { userId: payload.userId, language: payload.language })
    yield put(actions.getAllUserLanguages(payload.userId))
    yield put(actions.updateUserLanguageSuccess())
  } catch (error) {
    yield put(actions.updateUserLanguageError(error))
  }
}

function* deleteUserLanguageSaga({ payload }) {
  try {
    call(services.deleteUserLanguage, { userId: payload.userId, language: payload.language })
    yield put(actions.getAllUserLanguages(payload.userId))
    yield put(actions.deleteUSerLanguageSuccess())
  } catch (error) {
    yield put(actions.deleteUSerLanguageError(error))
  }
}

export default function* userSagas() {
  yield all([
    takeLatest(actions.getUserLanguagesRequest, getUserLanguagesSaga),
    takeLatest(actions.addUserLanguageRequest, addUserLanguageSaga),
    takeLatest(actions.updateUserLanguageRequest, updateUserLanguageSaga),
    takeLatest(actions.deleteUserLanguageRequest, deleteUserLanguageSaga),
  ])
}
