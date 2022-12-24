import React from 'react'

import {
  screen,
  renderWithUserLoading,
  servers,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
} from 'testUtils'

import { UpdateProfileForm } from './index'

const setup = () => renderWithUserLoading(<UpdateProfileForm />)

const requestFunc = jest.fn()

const mockedUser = {
  id: 1,
  name: 'user_name',
  last_name: 'last_name',
  birthdate: '1974-05-01',
  email: 'some@mail.com',
}

const updatedUser = {
  name: 'new_user_name',
  last_name: 'new_last_name',
  birthdate: '1994-05-01',
  email: 'some_new@mail.com',
}

const server = servers.updateProfileForm({ mockedUser, requestFunc })

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
}))
describe('ProfileContainer', () => {
  test('Correct update request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const submitButton = screen.getByText('updateProfile.submitButton')
    const name = screen.getByTestId('name')
    const lastName = screen.getByTestId('lastName')
    const birthdate = screen.getByTestId('birthdate')
    const email = screen.getByTestId('email')

    fireEvent.change(name, { target: { value: updatedUser.name } })
    fireEvent.change(lastName, { target: { value: updatedUser.last_name } })
    fireEvent.change(birthdate, { target: { value: updatedUser.birthdate } })
    fireEvent.change(email, { target: { value: updatedUser.email } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(requestFunc).toHaveBeenCalled()
      expect(requestFunc).toHaveBeenCalledWith(updatedUser)
    })
  })
})
