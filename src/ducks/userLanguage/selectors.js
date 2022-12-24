const selectLoading = (state) => state.userLanguage.loading

const selectUserLanguages = (state) => state.userLanguage.userLanguages

const selectUserError = (state) => state.userLanguage.error

const selectors = {
  selectLoading,
  selectUserLanguages,
  selectUserError,
}

export default selectors
