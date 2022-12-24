import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, ReactReduxContext } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { AppContainer } from './containers/AppContainer'
import store, { history } from './store'
import './i18n'

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <ConnectedRouter history={history}>
      <AppContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
