import React from 'react'

import { fireEvent, screen, renderWithUserLoading, servers } from 'testUtils'
import { Roles, Routes } from 'constans'

import { waitForElementToBeRemoved } from '../../testUtils'

import { ProfileContainer } from './index'

const setup = () => renderWithUserLoading(<ProfileContainer />)

const mockPushFunc = jest.fn()

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPushFunc }),
}))

const mockedUser = {
  id: 1,
  name: 'user_name',
  last_name: 'last_name',
  birthdate: '1974-05-01',
  email: 'some@mail.com',
  role: Roles.admin,
}

const server = servers.profileContainer({ mockedUser })

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ProfileContainer', () => {
  test('Update button is working', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const updateButton = screen.getByText('profilePage.updateButton')

    fireEvent.click(updateButton)
    expect(mockPushFunc).toHaveBeenCalled()
    expect(mockPushFunc).toHaveBeenLastCalledWith(Routes.UPDATE_CURRENT_USER_PROFILE)
  })
  test('Correct data displayed', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const name = screen.getByText(mockedUser.name, { exact: false })
    const lastName = screen.getByText(mockedUser.last_name, { exact: false })
    const birthdate = screen.getByText(mockedUser.birthdate, { exact: false })
    const email = screen.getByText(mockedUser.email, { exact: false })
    const role = screen.getByText(mockedUser.role, { exact: false })

    expect(name).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(birthdate).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(role).toBeInTheDocument()
  })
})
