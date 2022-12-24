import request from 'utils/request'
import { Api } from 'constans'

const getAllExperiences = (id) => request.get(Api.EXPERIENCE.GET_ALL_EXPERIENCES(id))

const createExperience = ({ userId, ...data }) => request.post(Api.EXPERIENCE.CREATE(userId), data)

const updateExperience = ({ userId, ...data }) =>
  request.put(Api.EXPERIENCE.UPDATE_EXPERIENCE({ userId, experienceId: data.id }), data)

const deleteExperience = ({ userId, experienceId }) =>
  request.delete(Api.EXPERIENCE.DELETE_EXPERIENCE({ userId, experienceId }))

const services = {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
}

export default services
