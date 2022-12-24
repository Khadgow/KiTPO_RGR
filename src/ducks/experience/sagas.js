import { all, put, call, takeLatest } from 'redux-saga/effects'
import { normalize, schema } from 'normalizr'

import { actions } from './slice'
import services from './services'

const experiencesSchema = new schema.Entity('experiences')
const normalizeSchema = { experiences: [experiencesSchema] }

function* getAllExperiencesSaga({ payload }) {
  try {
    const experiencesResponse = yield call(services.getAllExperiences, payload.userId)
    const { entities, result } = normalize(experiencesResponse.data.data, normalizeSchema)
    yield put(
      actions.getAllExperiencesSuccess({ data: entities.experiences, ids: result.experiences }),
    )
  } catch (error) {
    yield put(actions.getAllExperiencesError(error))
  }
}

function* createExperienceSaga({ payload }) {
  try {
    yield call(services.createExperience, payload)
    yield put(actions.getAllExperiencesRequest({ userId: payload.userId }))
    yield put(actions.updateExperienceSuccess())
  } catch (error) {
    yield put(actions.updateExperienceError(error))
  }
}

function* updateExperienceSaga({ payload }) {
  try {
    yield call(services.updateExperience, payload)
    yield put(actions.getAllExperiencesRequest({ userId: payload.userId }))
    yield put(actions.updateExperienceSuccess())
  } catch (error) {
    yield put(actions.updateExperienceError(error))
  }
}

function* deleteExperienceSaga({ payload }) {
  try {
    yield call(services.deleteExperience, payload)
    yield put(actions.getAllExperiencesRequest({ userId: payload.userId }))
    yield put(actions.deleteExperienceSuccess())
  } catch (error) {
    yield put(actions.deleteExperienceError(error))
  }
}

export default function* experienceSagas() {
  yield all([
    takeLatest(actions.getAllExperiencesRequest, getAllExperiencesSaga),
    takeLatest(actions.createExperienceRequest, createExperienceSaga),
    takeLatest(actions.updateExperienceRequest, updateExperienceSaga),
    takeLatest(actions.deleteExperienceRequest, deleteExperienceSaga),
  ])
}
