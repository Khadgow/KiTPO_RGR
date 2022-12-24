import { actions, reducer } from './slice'
import selectors from './selectors'
import sagas from './sagas'

const user = {
  reducer,
  actions,
  selectors,
  sagas,
}

export default user
