import React from 'react'
import { format } from 'date-fns'

import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  renderWithUserLoading,
  waitFor,
  servers,
} from 'testUtils'
import { dateFormat } from 'constans'

import { ContactInformationForm } from './index'

const setup = () => renderWithUserLoading(<ContactInformationForm />)

const mockedUser = { id: 1, name: 'name', last_name: 'last name', birthdate: '1974-05-01' }
const newUser = { name: 'first', last_name: 'second', birthdate: '1999-01-01' }

const requestFunc = jest.fn()

const getAllFormInputs = () => {
  const lastNameInput = screen.getByTestId('lastNameInput')
  const birthdateInput = screen.getByTestId('birthdateInput')
  const nameInput = screen.getByTestId('nameInput')
  const submitButton = screen.getByTestId('nextButton')
  return { lastNameInput, birthdateInput, nameInput, submitButton }
}

const server = servers.contactInformationForm({ requestFunc, mockedUser })
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ContactInformationForm', () => {
  test('No errors for valid data', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const { lastNameInput, birthdateInput, nameInput, submitButton } = getAllFormInputs()

    fireEvent.click(submitButton)

    try {
      const errors = await screen.findAllByText('errors', { exact: false })
      expect(errors).toHaveLength(0)
    } catch (error) {
      expect(error.message.includes('Unable to find an element')).toEqual(true)
      expect(nameInput.value).toBe(mockedUser.name)
      expect(lastNameInput.value).toBe(mockedUser.last_name)
      expect(birthdateInput.value).toBe(mockedUser.birthdate)
    }
  })

  test('Correct request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const { lastNameInput, birthdateInput, nameInput, submitButton } = getAllFormInputs()

    fireEvent.change(nameInput, { target: { value: newUser.name } })
    fireEvent.change(lastNameInput, { target: { value: newUser.last_name } })
    fireEvent.change(birthdateInput, { target: { value: newUser.birthdate } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(requestFunc).toHaveBeenCalledTimes(1)

      expect(requestFunc).toHaveBeenCalledWith(newUser)
    })
  })

  test('Show errors for invalid data', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const { lastNameInput, birthdateInput, nameInput, submitButton } = getAllFormInputs()

    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.change(lastNameInput, { target: { value: '' } })
    fireEvent.change(birthdateInput, { target: { value: format(new Date(), dateFormat) } })

    fireEvent.click(submitButton)

    await waitFor(async () => {
      expect(requestFunc).not.toHaveBeenCalled()
      const errors = await screen.findAllByText('errors', { exact: false })
      expect(errors).toHaveLength(3)
    })
  })
})
