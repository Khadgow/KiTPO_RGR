import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'

import user from 'ducks/user'
import posts from 'ducks/posts'
import multiStepForm from 'ducks/multiStepForm'
import education from 'ducks/education'
import experience from 'ducks/experience'
import language from 'ducks/language'
import userLanguage from 'ducks/userLanguage'

const createRootReducer = (history) =>
  combineReducers({
    posts: posts.reducer,
    user: user.reducer,
    multiStepForm: multiStepForm.reducer,
    education: education.reducer,
    experience: experience.reducer,
    language: language.reducer,
    userLanguage: userLanguage.reducer,
    router: connectRouter(history),
  })
export default createRootReducer
