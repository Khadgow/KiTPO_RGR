import React from 'react'
import { Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import './app.css'

import { ProfileContainer } from 'containers/ProfileContainer'
import { PostListContainer } from 'containers/PostListContainer'
import { CreatePostForm } from 'containers/CreatePostForm'
import { EditPostForm } from 'containers/EditPostForm'
import { LoginForm } from 'containers/LoginForm'
import { Routes } from 'constans'
import { CommonLayoutComponent } from 'layout/CommonLayoutComponent'
import { AuthLayoutComponent } from 'layout/AuthLayoutComponent'
import { UsersListContainer } from 'containers/UsersListContainer'
import { UpdateProfileForm } from 'containers/UpdateProfileForm'
import { MultiStepForm } from 'containers/MultiStepForm'
import { RegisterForm } from 'containers/RegisterForm'
import { history } from 'store/index'

const AppComponent = ({ isAuthenticated, role }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <CommonLayoutComponent
        path={Routes.ROOT}
        component={PostListContainer}
        isAuthenticated={isAuthenticated}
        role={role}
        exact
      />
      <CommonLayoutComponent
        path={Routes.INFO}
        component={EditPostForm}
        isAuthenticated={isAuthenticated}
        role={role}
        adminRoleRequired
        exact
      />
      <CommonLayoutComponent
        path={Routes.CREATE}
        component={CreatePostForm}
        isAuthenticated={isAuthenticated}
        role={role}
        adminRoleRequired
        exact
      />
      <CommonLayoutComponent
        path={Routes.USERS}
        component={UsersListContainer}
        isAuthenticated={isAuthenticated}
        role={role}
        adminRoleRequired
        exact
      />
      <CommonLayoutComponent
        path={Routes.PROFILE}
        component={ProfileContainer}
        isAuthenticated={isAuthenticated}
        role={role}
        exact
      />
      <CommonLayoutComponent
        path={Routes.UPDATE_CURRENT_USER_PROFILE}
        component={UpdateProfileForm}
        isAuthenticated={isAuthenticated}
        role={role}
        exact
      />
      <CommonLayoutComponent
        path={Routes.UPDATE_USER_PROFILE}
        component={UpdateProfileForm}
        isAuthenticated={isAuthenticated}
        role={role}
        adminRoleRequired
        exact
      />
      <CommonLayoutComponent
        path={Routes.MULTI_STEP_FORM}
        component={MultiStepForm}
        isAuthenticated={isAuthenticated}
        role={role}
        exact
      />
      <AuthLayoutComponent
        path={Routes.LOGIN}
        component={LoginForm}
        isAuthenticated={isAuthenticated}
        exact
      />
      <AuthLayoutComponent
        path={Routes.REGISTER}
        component={RegisterForm}
        isAuthenticated={isAuthenticated}
        exact
      />
    </Switch>
  </ConnectedRouter>
)

export { AppComponent }
