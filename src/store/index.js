import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import rootSaga from './root-saga'
import rootReducer from './root-reducer'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer(history),
  middleware: [sagaMiddleware, routerMiddleware(history)],
})

sagaMiddleware.run(rootSaga)

export default store
