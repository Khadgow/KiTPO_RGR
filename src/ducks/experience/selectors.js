const selectLoading = (state) => state.experience.loading

const selectAllExperiences = (state) => state.experience.experiences

const selectors = {
  selectLoading,
  selectAllExperiences,
}

export default selectors
