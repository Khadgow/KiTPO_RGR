import { all, put, call, takeLatest } from 'redux-saga/effects'

import { actions } from './slice'
import services from './services'

function* getAllLanguagesSaga() {
  try {
    const languages = yield call(services.getAllLanguages)
    yield put(actions.getAllLanguagesSuccess(languages.data.data.languages))
  } catch (error) {
    yield put(actions.getAllLanguagesError(error))
  }
}

function* createLanguageSaga({ payload }) {
  try {
    yield call(services.createLanguage, payload)
    yield put(actions.getAllLanguagesRequest())
    yield put(actions.updateLanguageSuccess())
  } catch (error) {
    yield put(actions.updateLanguageError(error))
  }
}

function* updateLanguageSaga({ payload }) {
  try {
    yield call(services.updateLanguage, payload)
    yield put(actions.getAllLanguagesRequest())
    yield put(actions.updateLanguageSuccess())
  } catch (error) {
    yield put(actions.updateLanguageError(error))
  }
}

function* deleteLanguageSaga({ payload }) {
  try {
    yield call(services.deleteLanguage, payload)
    yield put(actions.getAllLanguagesRequest())
    yield put(actions.deleteLanguageSuccess())
  } catch (error) {
    yield put(actions.deleteLanguageError(error))
  }
}

export default function* experienceSagas() {
  yield all([
    takeLatest(actions.getAllLanguagesRequest, getAllLanguagesSaga),
    takeLatest(actions.createLanguageRequest, createLanguageSaga),
    takeLatest(actions.updateLanguageRequest, updateLanguageSaga),
    takeLatest(actions.deleteLanguageRequest, deleteLanguageSaga),
  ])
}
