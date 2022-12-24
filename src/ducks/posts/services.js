import request from 'utils/request'
import { Api } from 'constans'

const createPost = (data) => request.post(Api.POSTS.CREATE, data)

const getPostById = (id) => request.get(Api.POSTS.GET_POST(id))

const editPost = ({ id, title, content }) =>
  request.put(Api.POSTS.EDIT_POST(id), { title, content })

const deletePost = (id) => request.delete(Api.POSTS.DELETE_POST(id))

const getAllPosts = (postsPage) =>
  request.get(Api.POSTS.GET_ALL_POSTS, { params: { page: postsPage } })

const likePost = (id) => request.post(Api.POSTS.LIKE_POST(id))

const services = {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  getPostById,
  likePost,
}

export default services
