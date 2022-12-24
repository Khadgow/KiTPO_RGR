const selectLoading = (state) => state.language.loading

const selectAllLanguages = (state) => state.language.languages

const selectors = {
  selectLoading,
  selectAllLanguages,
}

export default selectors
