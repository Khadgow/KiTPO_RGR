import { createSlice } from '@reduxjs/toolkit'

const startLoading = (state) => {
  state.loading = true
  state.error = null
}

const stopLoading = (state) => {
  state.loading = false
}

const setError = (state, action) => {
  state.loading = false
  state.error = action.error
}

const initialState = {
  loading: false,
  error: null,
  userLanguages: {},
}

const userSlice = createSlice({
  name: 'userLanguage',
  initialState,
  reducers: {
    // getUserLanguages
    getUserLanguagesRequest: startLoading,
    getUserLanguagesSuccess: (state, action) => {
      state.userLanguages = action.payload
      state.loading = false
    },
    getUserLanguagesError: setError,
    // addUserLanguage
    addUserLanguageRequest: startLoading,
    addUserLanguageSuccess: stopLoading,
    addUserLanguageError: setError,
    // updateUserLanguage
    updateUserLanguageRequest: startLoading,
    updateUserLanguageSuccess: stopLoading,
    updateUserLanguageError: setError,
    // deleteUserLanguage
    deleteUserLanguageRequest: startLoading,
    deleteUserLanguageSuccess: stopLoading,
    deleteUserLanguageError: setError,
  },
})
export const { actions } = userSlice
export const { reducer } = userSlice
