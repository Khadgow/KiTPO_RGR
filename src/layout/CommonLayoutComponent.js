import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { Roles, Routes } from 'constans'

const CommonLayoutComponent = ({
  component: Component,
  isAuthenticated,
  role,
  adminRoleRequired,
  ...restProps
}) => {
  if (!isAuthenticated) {
    return <Redirect to={Routes.LOGIN} />
  }
  if (role !== Roles.admin && adminRoleRequired) {
    return <Redirect to={Routes.ROOT} />
  }

  return <Route {...restProps} render={(props) => <Component {...props} role={role} />} />
}
export { CommonLayoutComponent }
