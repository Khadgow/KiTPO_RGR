import request from 'utils/request'
import { Api } from 'constans'

const loginUser = (data) => request.post(Api.USER.LOGIN, data)

const registerUser = (data) => request.post(Api.USER.REGISTER, data)

const loadUser = () => request.get(Api.USER.LOAD_USER)

const getAllUsers = () => request.get(Api.USER.GET_ALL_USERS)

const getUserById = (id) => request.get(Api.USER.GET_USER(id))

const updateUserById = ({ id, ...userData }) => request.put(Api.USER.UPDATE_USER(id), userData)

const updateUserAvatar = ({ id, avatar, type }) => {
  return request.post(Api.USER.UPDATE_USER_AVATAR(id), avatar, {
    headers: {
      'Content-Type': type,
    },
  })
}

const services = {
  loginUser,
  registerUser,
  loadUser,
  getAllUsers,
  getUserById,
  updateUserById,
  updateUserAvatar,
}

export default services
