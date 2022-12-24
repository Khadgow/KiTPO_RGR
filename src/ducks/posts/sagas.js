import { all, put, call, takeLatest, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { Routes } from 'constans'

import { actions } from './slice'
import services from './services'
import selectors from './selectors'

function* getAllPosts() {
  try {
    const postsPage = yield select(selectors.selectPostsPage)
    const posts = yield call(services.getAllPosts, postsPage)
    yield put(actions.getAllPostsSuccess(posts.data.data))
  } catch (error) {
    yield put(actions.getAllPostsError(error))
  }
}

function* getPostById({ payload }) {
  try {
    const post = yield call(services.getPostById, payload)
    yield put(actions.getPostByIdSuccess(post.data.data.post))
  } catch (error) {
    yield put(actions.getPostByIdError(error))
  }
}

function* createPost({ payload }) {
  try {
    yield call(services.createPost, payload)
    yield put(actions.createPostSuccess())
  } catch (error) {
    yield put(actions.createPostError(error))
  }
}

function* editPost({ payload }) {
  try {
    yield call(services.editPost, payload)
    yield put(actions.editPostSuccess())
  } catch (error) {
    yield put(actions.editPostError(error))
  }
}
function* deletePost({ payload }) {
  try {
    yield call(services.deletePost, payload)
    yield put(actions.deletePostSuccess())
    push(Routes.ROOT)
  } catch (error) {
    yield put(actions.deletePostError(error))
  }
}

function* likePost({ payload }) {
  try {
    yield call(services.likePost, payload)
    yield put(actions.likePostSuccess())
    yield put(actions.getAllPostsRequest())
  } catch (error) {
    yield put(actions.likePostError(error))
  }
}

function* setPostsPage() {
  try {
    yield put(actions.getAllPostsRequest())
  } catch (error) {
    yield put(actions.likePostError(error))
  }
}

export default function* postsSagas() {
  yield all([
    takeLatest(actions.getAllPostsRequest, getAllPosts),
    takeLatest(actions.createPostRequest, createPost),
    takeLatest(actions.getPostByIdRequest, getPostById),
    takeLatest(actions.editPostRequest, editPost),
    takeLatest(actions.deletePostRequest, deletePost),
    takeLatest(actions.likePostRequest, likePost),
    takeLatest(actions.setPostsPage, setPostsPage),
  ])
}
