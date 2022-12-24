import { actions, reducer } from './slice'
import selectors from './selectors'
import services from './services'
import sagas from './sagas'

const education = {
  reducer,
  actions,
  selectors,
  services,
  sagas,
}

export default education
