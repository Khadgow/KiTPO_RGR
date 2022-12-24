import { createSlice } from '@reduxjs/toolkit'

const startLoading = (state) => {
  state.loading = true
  state.error = null
}

const setsError = (state, action) => {
  state.loading = false
  state.error = action.error
}

const initialState = {
  loading: false,
  error: null,
  step: 0,
}

const multiStepFormSlice = createSlice({
  name: 'multiStepForm',
  initialState,
  reducers: {
    // First step
    contactInformationRequest: startLoading,
    contactInformationSuccess: (state) => {
      state.step += 1
      state.loading = false
    },
    contactInformationError: setsError,

    // Second step
    educationInformationRequest: startLoading,
    educationInformationSuccess: (state) => {
      state.step += 1
      state.loading = false
    },
    educationInformationError: setsError,
    // Third step
    experienceInformationRequest: startLoading,
    experienceInformationSuccess: (state) => {
      state.step += 1
      state.loading = false
    },
    experienceInformationError: setsError,

    // Fourth step
    languageInformationRequest: startLoading,
    languageInformationSuccess: (state) => {
      state.loading = false
    },
    languageInformationError: setsError,

    // Steps
    incrementStep: (state) => {
      state.step += 1
    },
    decrementStep: (state) => {
      state.step -= 1
    },
  },
})
export const { actions } = multiStepFormSlice
export const { reducer } = multiStepFormSlice
