import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import selectors from 'ducks/user/selectors'
import { Routes } from 'constans'
import { ProfileComponent } from 'components/ProfileComponent'

export const ProfileContainer = () => {
  const user = useSelector(selectors.selectUser)

  const history = useHistory()

  const updateButtonHandler = useCallback(
    () => history.push(Routes.UPDATE_CURRENT_USER_PROFILE),
    [history],
  )

  return <ProfileComponent {...user} updateButtonHandler={updateButtonHandler} />
}
