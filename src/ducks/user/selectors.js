const isInitialized = (state) => state.user.isInitialized

const selectUser = (state) => state.user.user

const selectRole = (state) => state.user.user?.role

const selectAuthState = (state) => state.user.isAuthenticated

const selectLoading = (state) => state.user.loading

const selectAllUsers = (state) => state.user.allUsers

const selectUserById = (state) => state.user.userById

const selectUserError = (state) => state.user.error

const selectors = {
  isInitialized,
  selectUser,
  selectAuthState,
  selectLoading,
  selectRole,
  selectAllUsers,
  selectUserById,
  selectUserError,
}

export default selectors
