import { createSlice } from '@reduxjs/toolkit'

const startLoading = (state) => {
  state.loading = true
  state.error = null
}

const stopLoading = (state) => {
  state.loading = false
}

const setError = (state, action) => {
  state.posts = []
  state.postById = {}
  state.loading = false
  state.error = action.error
}

const initialState = {
  posts: [],
  postById: {},
  loading: false,
  postsPage: 1,
  lastPostsPage: 1,
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    //   getAllPosts
    getAllPostsRequest: startLoading,
    getAllPostsSuccess: (state, action) => {
      state.posts = action.payload.posts
      state.lastPostsPage = action.payload.meta.lastPage
      state.loading = false
    },
    getAllPostsError: setError,
    // getPostById
    getPostByIdRequest: startLoading,
    getPostByIdSuccess: (state, action) => {
      state.postById = action.payload
      state.loading = false
    },
    getPostByIdError: setError,
    // createPost
    createPostRequest: startLoading,
    createPostSuccess: stopLoading,
    createPostError: setError,
    // editPost
    editPostRequest: startLoading,
    editPostSuccess: stopLoading,
    editPostError: setError,
    // likePost
    likePostRequest: startLoading,
    likePostSuccess: stopLoading,
    likePostError: setError,
    // deletePost
    deletePostRequest: startLoading,
    deletePostSuccess: stopLoading,
    deletePostError: setError,
    // setPostsPage
    setPostsPage: (state, action) => {
      state.postsPage = action.payload
    },
  },
})

export const { actions } = postsSlice
export const { reducer } = postsSlice
