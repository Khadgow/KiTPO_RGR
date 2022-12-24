import { all, put, call, takeLatest, select } from 'redux-saga/effects'

import { ApiTokenStorageKey } from 'constans'

import { actions } from './slice'
import services from './services'
import selectors from './selectors'

function* loginUserSaga({ payload }) {
  try {
    yield call(services.loginUser, payload)
    const user = yield call(services.loadUser)
    yield put(actions.loginSuccess(user.data.data.user))
  } catch (error) {
    yield put(actions.loginError(error))
  }
}

function* registerUserSaga({ payload }) {
  try {
    yield call(services.registerUser, payload)
    const user = yield call(services.loadUser)
    yield put(actions.registerSuccess(user.data.data.user))
  } catch (error) {
    yield put(actions.registerError(error))
  }
}

function* loadUserSaga() {
  try {
    const userInfo = yield call(services.loadUser)
    yield put(actions.loadUserSuccess(userInfo.data.data.user))
  } catch (error) {
    yield put(actions.loadUserError(error))
  }
}

function* initialSaga() {
  if (window.localStorage.getItem(ApiTokenStorageKey)) {
    yield call(loadUserSaga)
  }
  yield put(actions.init())
}

function* getAllUsers() {
  try {
    const users = yield call(services.getAllUsers)
    yield put(actions.getAllUsersSuccess(users.data.data.users))
  } catch (error) {
    yield put(actions.getAllUsersError(error))
  }
}

function* getUserById({ payload }) {
  try {
    const user = yield call(services.getUserById, payload)
    const currentUser = yield select(selectors.selectUser)
    if (user.id === currentUser.id) {
      yield call(loadUserSaga)
    }
    yield put(actions.getUserByIdSuccess(user.data.data.user))
  } catch (error) {
    yield put(actions.getUserByIdError(error))
  }
}

function* updateUserById({ payload }) {
  try {
    const updatedUser = yield call(services.updateUserById, payload)
    const user = yield select(selectors.selectUser)
    if (user.id === updatedUser.data.data.user.id) {
      yield call(loadUserSaga)
    }
    yield put(actions.getUserByIdSuccess(updatedUser.data.data.user))
    yield put(actions.updateUserByIdSuccess())
  } catch (error) {
    yield put(actions.getUserByIdError(error))
  }
}

function* updateUserAvatar({ payload }) {
  try {
    yield call(services.updateUserAvatar, payload)
    yield put(actions.getUserByIdRequest(payload.id))
    yield put(actions.updateUserAvatarSuccess())
  } catch (error) {
    yield put(actions.updateUserAvatarError(error))
  }
}

export default function* userSagas() {
  yield all([
    call(initialSaga),
    takeLatest(actions.registerRequest, registerUserSaga),
    takeLatest(actions.loginRequest, loginUserSaga),
    takeLatest(actions.loadUserRequest, loadUserSaga),
    takeLatest(actions.getAllUsersRequest, getAllUsers),
    takeLatest(actions.getUserByIdRequest, getUserById),
    takeLatest(actions.updateUserByIdRequest, updateUserById),
    takeLatest(actions.updateUserAvatarRequest, updateUserAvatar),
  ])
}
