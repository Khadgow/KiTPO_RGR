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
  experiences: [],
  loading: false,
  error: null,
}

const experienceSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    //   getAllLanguages
    getAllLanguagesRequest: startLoading,
    getAllLanguagesSuccess: (state, action) => {
      state.languages = action.payload
      state.loading = false
    },
    getAllLanguagesError: setError,
    // createLanguage
    createLanguageRequest: startLoading,
    createLanguageSuccess: stopLoading,
    createLanguageError: setError,
    // editLanguage
    updateLanguageRequest: startLoading,
    updateLanguageSuccess: stopLoading,
    updateLanguageError: setError,
    // deleteLanguage
    deleteLanguageRequest: startLoading,
    deleteLanguageSuccess: stopLoading,
    deleteLanguageError: setError,
  },
})
export const { actions } = experienceSlice
export const { reducer } = experienceSlice
