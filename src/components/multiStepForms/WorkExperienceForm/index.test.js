import React from 'react'
import { within } from '@testing-library/react'

import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  renderWithUserLoading,
  waitFor,
  servers,
} from 'testUtils'

import { WorkExperienceForm } from './index'

const setup = () => renderWithUserLoading(<WorkExperienceForm />)

const mockedWorkExperiences = [
  {
    id: 1,
    user_id: 1,
    company_name: 'Foo Corp.',
    position: 'Foo pos',
    hired_on: '2015-05-01',
    quit_on: '2016-05-01',
    is_current: false,
  },
  {
    id: 2,
    user_id: 1,
    company_name: 'Bar Corp.',
    position: 'Bar pos',
    hired_on: '2016-01-01',
    quit_on: '2018-05-01',
    is_current: false,
  },
]

const newExperience = {
  company_name: 'Foo Bar Corp.',
  position: 'Foo Bar pos',
  hired_on: '2017-05-01',
  quit_on: '2020-01-01',
  is_current: false,
}

const mockedUser = { id: 1, name: 'name', last_name: 'last name', birthdate: '1974-05-01' }

const requestFunc = jest.fn()

const getExperienceInputs = (experience) => {
  const companyNameInput = within(experience).getByTestId('companyName')
  const positionInput = within(experience).getByTestId('position')
  const hiredOnInput = within(experience).getByTestId('hiredOn')
  const quitOnInput = within(experience).getByTestId('quitOn')

  return { companyNameInput, positionInput, hiredOnInput, quitOnInput }
}

const server = servers.workExperienceForm({ mockedUser, requestFunc, mockedWorkExperiences })
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ExperienceInformationForm', () => {
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

    const experiences = await screen.findAllByTestId('experienceContainer')

    expect(experiences).toHaveLength(3)

    const { companyNameInput, positionInput, hiredOnInput, quitOnInput } = getExperienceInputs(
      experiences[experiences.length - 1],
    )

    fireEvent.change(companyNameInput, { target: { value: newExperience.company_name } })
    fireEvent.change(positionInput, { target: { value: newExperience.position } })
    fireEvent.change(hiredOnInput, { target: { value: newExperience.hired_on } })
    fireEvent.change(quitOnInput, { target: { value: newExperience.quit_on } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(requestFunc).toHaveBeenCalledTimes(1)

      expect(requestFunc).toHaveBeenCalledWith(newExperience)
    })
  })

  test('Correct edit request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const submitButton = screen.getByTestId('nextButton')

    const experiences = await screen.findAllByTestId('experienceContainer')

    expect(experiences).toHaveLength(2)

    const { companyNameInput, positionInput, hiredOnInput, quitOnInput } = getExperienceInputs(
      experiences[experiences.length - 1],
    )

    fireEvent.change(companyNameInput, { target: { value: newExperience.company_name } })
    fireEvent.change(positionInput, { target: { value: newExperience.position } })
    fireEvent.change(hiredOnInput, { target: { value: newExperience.hired_on } })
    fireEvent.change(quitOnInput, { target: { value: newExperience.quit_on } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(requestFunc).toHaveBeenCalledTimes(1)

      expect(requestFunc).toHaveBeenCalledWith({ ...newExperience, id: 2 })
    })
  })

  test('Correct delete request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    const submitButton = screen.getByTestId('nextButton')

    const educations = await screen.findAllByTestId('experienceContainer')

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

    const experiences = await screen.findAllByTestId('experienceContainer')

    expect(experiences).toHaveLength(3)

    const { companyNameInput, positionInput, hiredOnInput, quitOnInput } = getExperienceInputs(
      experiences[experiences.length - 1],
    )

    fireEvent.change(companyNameInput, { target: { value: '' } })
    fireEvent.change(positionInput, { target: { value: '' } })
    fireEvent.change(hiredOnInput, { target: { value: '2000-01-01' } })
    fireEvent.change(quitOnInput, { target: { value: '2020-01-01' } })

    fireEvent.click(submitButton)

    await waitFor(async () => {
      expect(requestFunc).not.toHaveBeenCalled()
      const errors = await screen.findAllByText('errors', { exact: false })
      expect(errors).toHaveLength(3)
    })
  })
})
