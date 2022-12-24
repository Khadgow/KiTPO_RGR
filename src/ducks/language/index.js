import { actions, reducer } from './slice'
import selectors from './selectors'
import services from './services'
import sagas from './sagas'

const language = {
  reducer,
  actions,
  selectors,
  services,
  sagas,
}

export default language
