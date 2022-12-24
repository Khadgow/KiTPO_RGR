import { createSlice } from '@reduxjs/toolkit'

const startLoading = (state) => {
  state.loading = true
  state.error = null
}

const stopLoading = (state) => {
  state.loading = false
}

const setAuntificationError = (state, action) => {
  state.user = null
  state.isAuthenticated = false
  state.loading = false
  state.error = action.error
}

const setUserError = (state, action) => {
  state.loading = false
  state.error = action.error
}

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  loading: false,
  error: null,
  allUsers: [],
  user: null,
  userById: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // init
    init: (state) => {
      state.isInitialized = true
    },
    // login
    loginRequest: startLoading,
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
    },
    loginError: setAuntificationError,
    // register request
    registerRequest: startLoading,
    registerSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
    },
    registerError: setAuntificationError,
    // loadUser
    loadUserRequest: startLoading,
    loadUserSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
    },
    loadUserError: setAuntificationError,
    // getAllUsers
    getAllUsersRequest: startLoading,
    getAllUsersSuccess: (state, action) => {
      state.allUsers = action.payload
      state.loading = false
    },
    getAllUsersError: setUserError,
    // getUserById
    getUserByIdRequest: startLoading,
    getUserByIdSuccess: (state, action) => {
      state.userById = action.payload
      state.loading = false
    },
    getUserByIdError: setUserError,
    // updateUserById
    updateUserByIdRequest: startLoading,
    updateUserByIdSuccess: stopLoading,
    updateUserByIdError: setUserError,
    // updateUserAvatar
    updateUserAvatarRequest: startLoading,
    updateUserAvatarSuccess: stopLoading,
    updateUserAvatarError: setUserError,
  },
})
export const { actions } = userSlice
export const { reducer } = userSlice
