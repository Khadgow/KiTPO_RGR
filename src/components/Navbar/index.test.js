import React from 'react'

import { renderWithUserLoading, screen, servers, waitForElementToBeRemoved } from 'testUtils'
import { Roles } from 'constans'

import { Navbar } from './index'

const setup = () => renderWithUserLoading(<Navbar />)

const mockedUser = {
  id: 1,
  name: 'name',
  last_name: 'last name',
  birthdate: '1974-05-01',
  role: Roles.user,
}

const mockedAdmin = {
  id: 1,
  name: 'name',
  last_name: 'last name',
  birthdate: '1974-05-01',
  role: Roles.admin,
}

describe('Navbar', () => {
  test('Show users link for admin', async () => {
    const server = servers.navbar({ mockedUser: mockedAdmin })
    server.listen()
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const link = screen.getByText('cardList.usersPage')
    expect(link).toBeInTheDocument()

    server.resetHandlers()
    server.close()
  })

  test('Do not show users link for user', async () => {
    const server = servers.navbar({ mockedUser })
    server.listen()
    setup()
    // await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const link = screen.queryByText('cardList.usersPage')
    expect(link).toEqual(null)

    server.resetHandlers()
    server.close()
  })
})
