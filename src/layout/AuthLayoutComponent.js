import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { Routes } from 'constans'

const AuthLayoutComponent = ({ isAuthenticated, ...restProps }) => {
  if (isAuthenticated) {
    return <Redirect to={Routes.ROOT} />
  }
  return <Route {...restProps} />
}
export { AuthLayoutComponent }
