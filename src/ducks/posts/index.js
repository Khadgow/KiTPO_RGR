import selectors from './selectors'
import { actions, reducer } from './slice'
import services from './services'
import sagas from './sagas'

const posts = {
  reducer,
  selectors,
  actions,
  services,
  sagas,
}

export default posts
