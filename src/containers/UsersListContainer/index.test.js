import React from 'react'

import { render, servers, screen, waitForElementToBeRemoved } from 'testUtils'
import { Roles } from 'constans'

import { UsersListContainer } from './index'

const mockedUsers = [
  {
    id: 1,
    name: 'name',
    last_name: 'last name',
    email: 'some@mail.com',
    role: Roles.user,
    birthdate: '2000-01-01',
  },
  {
    id: 2,
    name: 'name 2',
    last_name: 'last name 2',
    email: 'some2@mail.com',
    role: Roles.admin,
    birthdate: '1990-01-01',
  },
]

const server = servers.usersListContainer({ mockedUsers })

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('UsersListContainer', () => {
  test('Snapshot test', async () => {
    const { asFragment } = render(<UsersListContainer />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(asFragment()).toMatchSnapshot()
  })
})
