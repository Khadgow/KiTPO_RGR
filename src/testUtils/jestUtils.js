import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import { Provider, ReactReduxContext, useDispatch, useSelector } from 'react-redux'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'

import { actions } from 'ducks/user/slice'
import userSelectors from 'ducks/user/selectors'
import { Spinner } from 'components/Spinner/Spinner'
import rootReducer from 'store/root-reducer'
import rootSaga from 'store/root-saga'

let store
let history

beforeEach(() => {
  history = createBrowserHistory()
  const sagaMiddleware = createSagaMiddleware()

  store = configureStore({
    reducer: rootReducer(history),
    middleware: [sagaMiddleware, routerMiddleware(history)],
  })

  sagaMiddleware.run(rootSaga)
})

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

const UserLoadingContainer = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.loadUserRequest())
  }, [dispatch])
  const user = useSelector(userSelectors.selectUser)
  const isAuthenticated = useSelector(userSelectors.selectAuthState)
  if (!isAuthenticated || !user) {
    return <Spinner />
  }

  return children
}

const UserLoadingWrapper = ({ children }) => (
  <AllTheProviders>
    <UserLoadingContainer>{children}</UserLoadingContainer>
  </AllTheProviders>
)

export const renderWithUserLoading = (ui, options) =>
  render(ui, { wrapper: UserLoadingWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
