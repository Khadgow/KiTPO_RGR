import request from 'utils/request'
import { Api } from 'constans'

const getAllLanguages = () => request.get(Api.LANGUAGE.GET_ALL_LANGUAGES)

const createLanguage = (data) => request.post(Api.LANGUAGE.CREATE, data)

const updateLanguage = (data) => request.put(Api.LANGUAGE.UPDATE_LANGUAGE(data.code), data)

const deleteLanguage = ({ code }) => request.delete(Api.LANGUAGE.DELETE_LANGUAGE(code))

const services = {
  getAllLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
}

export default services
