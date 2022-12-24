import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

import { Api, ApiTokenStorageKey } from 'constans'
import { apiAppKey } from 'config'

const request = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  }),
)

function setJWTHeader(config) {
  config.headers['X-Application-Key'] = apiAppKey
  const token = window.localStorage.getItem(ApiTokenStorageKey)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

request.interceptors.request.use(setJWTHeader)

function setJWTLocalStorage(response) {
  const authUrlChecker = new RegExp(`${Api.USER.REGISTER}|${Api.USER.LOGIN}$`)
  const isAuthUrl = authUrlChecker.test(response.config.url)
  if (isAuthUrl) {
    const { token } = response.data.data
    if (token) {
      window.localStorage.setItem(ApiTokenStorageKey, token)
    }
  }

  return response
}

request.interceptors.response.use(setJWTLocalStorage)

export default request
