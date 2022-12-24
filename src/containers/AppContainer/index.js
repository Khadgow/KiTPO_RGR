import React from 'react'
import { useSelector } from 'react-redux'

import userSelectors from 'ducks/user/selectors'
import { AppComponent } from 'components/AppComponent/AppComponent'
import { Spinner } from 'components/Spinner/Spinner'

export const AppContainer = () => {
  const isInitialized = useSelector(userSelectors.isInitialized)
  const isAuthenticated = useSelector(userSelectors.selectAuthState)
  const role = useSelector(userSelectors.selectRole)

  if (!isInitialized) {
    return <Spinner />
  }

  return <AppComponent isAuthenticated={isAuthenticated} role={role} />
}
