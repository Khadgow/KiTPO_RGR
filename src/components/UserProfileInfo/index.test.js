import React from 'react'

import { render } from 'testUtils'
import { Roles } from 'constans'

import { UserProfileInfo } from './index'

const mockedUser = {
  name: 'name',
  lastName: 'last name',
  email: 'some@mail.com',
  role: Roles.user,
  birthdate: '2000-01-01',
}

describe('ProfileComponent', () => {
  test('Snapshot test', async () => {
    const { asFragment } = render(<UserProfileInfo {...mockedUser} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
