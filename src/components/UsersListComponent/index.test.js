import React from 'react'

import { render } from 'testUtils'
import { Roles } from 'constans'

import { UsersListComponent } from './index'

const mockedUsers = [
  {
    id: 1,
    name: 'name',
    lastName: 'last name',
    email: 'some@mail.com',
    role: Roles.user,
    birthdate: '2000-01-01',
  },
  {
    id: 2,
    name: 'name 2',
    lastName: 'last name 2',
    email: 'some2@mail.com',
    role: Roles.admin,
    birthdate: '1990-01-01',
  },
]

describe('UsersListComponent', () => {
  test('Snapshot test', async () => {
    const { asFragment } = render(<UsersListComponent users={mockedUsers} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
