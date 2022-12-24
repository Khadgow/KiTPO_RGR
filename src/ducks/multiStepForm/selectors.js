const selectError = (state) => state.multiStepForm.error

const selectStep = (state) => state.multiStepForm.step

const selectIsLoading = (state) => state.multiStepForm.isLoading

const selectors = {
  selectError,
  selectStep,
  selectIsLoading,
}

export default selectors
