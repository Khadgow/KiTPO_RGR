import { all, call } from 'redux-saga/effects'

import user from 'ducks/user'
import posts from 'ducks/posts'
import multiStepForm from 'ducks/multiStepForm'
import education from 'ducks/education'
import experience from 'ducks/experience'
import language from 'ducks/language'
import userLanguage from 'ducks/userLanguage'

function* rootSaga() {
  yield all([
    call(user.sagas),
    call(posts.sagas),
    call(multiStepForm.sagas),
    call(education.sagas),
    call(experience.sagas),
    call(language.sagas),
    call(userLanguage.sagas),
  ])
}
export default rootSaga
