import request from 'utils/request'
import { Api } from 'constans'

const getUserLanguages = (id) => request.get(Api.USER.GET_USER_LANGUAGES(id))

const addUserLanguage = ({ userId, ...data }) =>
  request.post(Api.USER.ADD_USER_LANGUAGE(userId), data)

const updateUserLanguage = ({ userId, ...data }) =>
  request.put(Api.USER.UPDATE_USER_LANGUAGE({ userId, languageCode: data.code }), data)

const deleteUserLanguage = ({ userId, languageCode }) =>
  request.delete(Api.USER.DELETE_USER_LANGUAGE({ userId, languageCode }))

const services = {
  getUserLanguages,
  addUserLanguage,
  updateUserLanguage,
  deleteUserLanguage,
}

export default services
