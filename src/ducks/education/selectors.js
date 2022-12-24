const selectLoading = (state) => state.education.loading

const selectAllEducations = (state) => state.education.educations

const selectors = {
  selectLoading,
  selectAllEducations,
}

export default selectors
