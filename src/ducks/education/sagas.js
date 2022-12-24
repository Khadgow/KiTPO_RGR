import { all, put, call, takeLatest } from 'redux-saga/effects'
import { normalize, schema } from 'normalizr'

import { actions } from './slice'
import services from './services'

const educationsSchema = new schema.Entity('educations')
const normalizeSchema = { educations: [educationsSchema] }

function* getAllEducationsSaga({ payload }) {
  try {
    const educationsResponse = yield call(services.getAllEducations, payload.userId)
    const { entities, result } = normalize(educationsResponse.data.data, normalizeSchema)
    yield put(
      actions.getAllEducationsSuccess({ data: entities.educations, ids: result.educations }),
    )
  } catch (error) {
    yield put(actions.getAllEducationsError(error))
  }
}

function* createEducationSaga({ payload }) {
  try {
    yield call(services.createEducation, payload)
    yield put(actions.getAllEducationsRequest({ userId: payload.userId }))
    yield put(actions.updateEducationSuccess())
  } catch (error) {
    yield put(actions.updateEducationError(error))
  }
}

function* updateEducationSaga({ payload }) {
  try {
    yield call(services.updateEducation, payload)
    yield put(actions.getAllEducationsRequest({ userId: payload.userId }))
    yield put(actions.updateEducationSuccess())
  } catch (error) {
    yield put(actions.updateEducationError(error))
  }
}

function* deleteEducationSaga({ payload }) {
  try {
    yield call(services.deleteEducation, payload)
    yield put(actions.getAllEducationsRequest({ userId: payload.userId }))
    yield put(actions.deleteEducationSuccess())
  } catch (error) {
    yield put(actions.deleteEducationError(error))
  }
}

export default function* educationSagas() {
  yield all([
    takeLatest(actions.getAllEducationsRequest, getAllEducationsSaga),
    takeLatest(actions.createEducationRequest, createEducationSaga),
    takeLatest(actions.updateEducationRequest, updateEducationSaga),
    takeLatest(actions.deleteEducationRequest, deleteEducationSaga),
  ])
}
