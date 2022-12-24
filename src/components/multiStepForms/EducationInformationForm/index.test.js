import React from 'react'

import {
  renderWithUserLoading,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
  servers,
  within,
} from 'testUtils'

import { EducationInformationForm } from './index'

const setup = () => renderWithUserLoading(<EducationInformationForm />)

const getEducationInputs = (education) => {
  const institutionInput = within(education).getByTestId('institution')
  const enrolledOnInput = within(education).getByTestId('enrolledOn')
  const graduatedOnInput = within(education).getByTestId('graduatedOn')
  return { institutionInput, enrolledOnInput, graduatedOnInput }
}

const mockedEducations = [
  {
    id: 1,
    user_id: 1,
    institution: 'НГУ',
    enrolled_on: '2011-01-01',
    graduated_on: '2016-01-01',
    is_current: false,
  },
  {
    id: 2,
    user_id: 1,
    institution: 'НГТУ',
    enrolled_on: '2017-01-01',
    graduated_on: '2019-01-01',
    is_current: false,
  },
]

const newEducation = {
  institution: 'СИБГУТИ',
  enrolled_on: '2020-01-01',
  graduated_on: '2021-01-01',
  is_current: false,
}

const mockedUser = { id: 1, name: 'name', last_name: 'last name', birthdate: '1974-05-01' }

const requestFunc = jest.fn()

const server = servers.educationInformationForm({ mockedUser, mockedEducations, requestFunc })
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('EducationInformationForm', () => {
  test('No errors for valid data', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const submitButton = screen.getByTestId('nextButton')

    fireEvent.click(submitButton)

    try {
      const errors = await screen.findAllByText('errors', { exact: false })
      expect(errors).toHaveLength(0)
    } catch (error) {
      expect(error.message.includes('Unable to find an element')).toEqual(true)
    }
  })

  test('Correct create request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const addButton = screen.getByText('formFields.add')
    const submitButton = screen.getByTestId('nextButton')
    fireEvent.click(addButton)

    const educations = await screen.findAllByTestId('educationContainer')

    expect(educations).toHaveLength(3)

    const { institutionInput, enrolledOnInput, graduatedOnInput } = getEducationInputs(
      educations[educations.length - 1],
    )

    fireEvent.change(institutionInput, { target: { value: newEducation.institution } })
    fireEvent.change(enrolledOnInput, { target: { value: newEducation.enrolled_on } })
    fireEvent.change(graduatedOnInput, { target: { value: newEducation.graduated_on } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(requestFunc).toHaveBeenCalledTimes(1)

      expect(requestFunc).toHaveBeenCalledWith(newEducation)
    })
  })

  test('Correct edit request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const submitButton = screen.getByTestId('nextButton')

    const educations = await screen.findAllByTestId('educationContainer')

    expect(educations).toHaveLength(2)

    const { institutionInput, enrolledOnInput, graduatedOnInput } = getEducationInputs(
      educations[educations.length - 1],
    )

    fireEvent.change(institutionInput, { target: { value: newEducation.institution } })
    fireEvent.change(graduatedOnInput, {
      target: { value: newEducation.graduated_on.substr(0, 4) },
    })
    fireEvent.change(enrolledOnInput, { target: { value: newEducation.enrolled_on.substr(0, 4) } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(requestFunc).toHaveBeenCalledTimes(1)

      expect(requestFunc).toHaveBeenCalledWith({ ...newEducation, id: 2 })
    })
  })

  test('Correct delete request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const submitButton = screen.getByTestId('nextButton')

    const educations = await screen.findAllByTestId('educationContainer')

    expect(educations).toHaveLength(2)

    const dropButton = educations[educations.length - 1].querySelector(`button[data-testid="drop"]`)

    fireEvent.click(dropButton)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(requestFunc).toHaveBeenCalledTimes(1)
    })
  })

  test('Show errors for invalid data', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const addButton = screen.getByText('formFields.add')
    const submitButton = screen.getByTestId('nextButton')
    fireEvent.click(addButton)

    const educations = await screen.findAllByTestId('educationContainer')

    expect(educations).toHaveLength(3)

    const { institutionInput, enrolledOnInput, graduatedOnInput } = getEducationInputs(
      educations[educations.length - 1],
    )

    fireEvent.change(institutionInput, { target: { value: '' } })
    fireEvent.change(enrolledOnInput, { target: { value: '2000' } })
    fireEvent.change(graduatedOnInput, { target: { value: '2022' } })

    fireEvent.click(submitButton)

    await waitFor(async () => {
      expect(requestFunc).not.toHaveBeenCalled()
      const errors = await screen.findAllByText('errors', { exact: false })
      expect(errors).toHaveLength(2)
    })
  })
})
