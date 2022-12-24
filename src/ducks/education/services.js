import request from 'utils/request'
import { Api } from 'constans'

const getAllEducations = (id) => request.get(Api.EDUCATION.GET_ALL_EDUCATIONS(id))

const createEducation = ({ userId, ...data }) => request.post(Api.EDUCATION.CREATE(userId), data)

const updateEducation = ({ userId, ...education }) =>
  request.put(Api.EDUCATION.UPDATE_EDUCATION({ userId, educationId: education.id }), education)

const deleteEducation = ({ userId, educationId }) =>
  request.delete(Api.EDUCATION.DELETE_EDUCATION({ userId, educationId }))

const services = {
  getAllEducations,
  createEducation,
  updateEducation,
  deleteEducation,
}

export default services
