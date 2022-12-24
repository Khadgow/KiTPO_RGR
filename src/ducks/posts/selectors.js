const selectPosts = (state) => state.posts.posts

const selectPostById = (state) => state.posts.postById

const selectLoading = (state) => state.posts.loading

const selectPostsPage = (state) => state.posts.postsPage

const selectLastPostsPage = (state) => state.posts.lastPostsPage

const selectors = {
  selectPosts,
  selectPostById,
  selectLoading,
  selectPostsPage,
  selectLastPostsPage,
}

export default selectors
