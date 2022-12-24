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
  educations: {},
  loading: false,
  error: null,
}

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    //   getAllEducations
    getAllEducationsRequest: startLoading,
    getAllEducationsSuccess: (state, action) => {
      state.educations = action.payload
      state.loading = false
    },
    getAllEducationsError: setError,
    // createEducation
    createEducationRequest: startLoading,
    createEducationSuccess: stopLoading,
    createEducationError: setError,

    // editEducation
    updateEducationRequest: startLoading,
    updateEducationSuccess: stopLoading,
    updateEducationError: setError,
    // deleteEducation
    deleteEducationRequest: startLoading,
    deleteEducationSuccess: stopLoading,
    deleteEducationError: setError,
  },
})
export const { actions } = educationSlice
export const { reducer } = educationSlice
