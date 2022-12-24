import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actions } from 'ducks/user/slice'
import { UsersListComponent } from 'components/UsersListComponent'
import selectors from 'ducks/user/selectors'
import { Spinner } from 'components/Spinner/Spinner'

export const UsersListContainer = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectors.selectAllUsers)
  const isLoading = useSelector(selectors.selectLoading)

  useEffect(() => {
    dispatch(actions.getAllUsersRequest())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return <UsersListComponent users={users} />
}
