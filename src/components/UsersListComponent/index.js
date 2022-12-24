import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { generatePath } from 'react-router'

import { Routes } from 'constans'

import { UserProfileInfo } from '../UserProfileInfo'

export const UsersListComponent = ({ users }) => {
  const history = useHistory()

  const onUpdateButtonHandler = useCallback(
    (id) => () => {
      history.push(generatePath(Routes.UPDATE_USER_PROFILE, { id }))
    },
    [history],
  )

  return (
    <div className="usersList">
      {users.map(({ id, ...user }) => (
        <div key={id}>
          <UserProfileInfo {...user} />
          <button onClick={onUpdateButtonHandler(id)} type="button">
            Update
          </button>
          <hr />
        </div>
      ))}
    </div>
  )
}
