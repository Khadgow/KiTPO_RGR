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
  experiences: {},
  loading: false,
  error: null,
}

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    //   getAllExperiences
    getAllExperiencesRequest: startLoading,
    getAllExperiencesSuccess: (state, action) => {
      state.experiences = action.payload
      state.loading = false
    },
    getAllExperiencesError: setError,
    // createExperience
    createExperienceRequest: startLoading,
    createEdxperienceSuccess: stopLoading,
    createEdxperienceError: setError,
    // createExperience array
    createExperienceArrayRequest: startLoading,
    createExperienceArraySuccess: stopLoading,
    createExperienceArrayError: setError,
    // editExperience
    updateExperienceRequest: startLoading,
    updateExperienceSuccess: stopLoading,
    updateExperienceError: setError,
    // deleteExperience
    deleteExperienceRequest: startLoading,
    deleteExperienceSuccess: stopLoading,
    deleteExperienceError: setError,
  },
})
export const { actions } = experienceSlice
export const { reducer } = experienceSlice
