import React from 'react'

import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  within,
  renderWithUserLoading,
  waitFor,
  servers,
} from 'testUtils'

import { LanguagesForm } from './index'

const setup = () => renderWithUserLoading(<LanguagesForm />)

const mockedLanguages = [
  {
    id: 1,
    name: 'English',
    native_name: 'English',
    code: 'en',
    awareness: 0,
    avg_knowledge_level: 0,
  },
  {
    id: 2,
    name: 'Russian',
    native_name: 'Русский',
    code: 'ru',
    awareness: 0,
    avg_knowledge_level: 0,
  },
  {
    id: 3,
    name: 'French',
    native_name: 'Français',
    code: 'fr',
    awareness: 0,
    avg_knowledge_level: 0,
  },
]
const mockedUserLanguages = [
  {
    id: 1,
    name: 'English',
    native_name: 'English',
    code: 'en',
    awareness: 0,
    avg_knowledge_level: 0,
    user_id: 1,
    level: 4,
  },
  {
    id: 2,
    name: 'Russian',
    native_name: 'Русский',
    code: 'ru',
    awareness: 0,
    avg_knowledge_level: 0,
    user_id: 1,
    level: 5,
  },
]

const newUserLanguage = {
  id: 3,
  name: 'French',
  native_name: 'Français',
  code: 'fr',
  awareness: 0,
  avg_knowledge_level: 0,
  user_id: 1,
  level: 0,
}

const updatedUserLanguage = {
  id: 2,
  name: 'English',
  native_name: 'English',
  code: 'en',
  awareness: 0,
  avg_knowledge_level: 0,
  user_id: 1,
  level: 5,
}

const mockedUser = { id: 1, name: 'name', last_name: 'last name', birthdate: '1974-05-01' }

const postRequestFunc = jest.fn()
const putRequestFunc = jest.fn()

const server = servers.languagesForm({
  mockedUser,
  mockedLanguages,
  mockedUserLanguages,
  putRequestFunc,
  postRequestFunc,
})

const keyDownEvent = {
  key: 'ArrowDown',
}

async function selectOption(container, optionText) {
  const placeholder = within(container).getByText('Select...')
  fireEvent.keyDown(placeholder, keyDownEvent)
  const option = await within(container).findByText(optionText)
  fireEvent.click(option)
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('LanguageInformationForm', () => {
  test('Correct create request', async () => {
    setup()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    const addButton = screen.getByText('formFields.add')
    const submitButton = screen.getByTestId('nextButton')

    await selectOption(screen.getByTestId('selectorContainer'), 'French')

    fireEvent.click(addButton)

    const languages = screen.getAllByTestId('languageContainer')
    expect(languages).toHaveLength(3)

    const frenchLanguage = languages.find(
      (language) => within(language).queryByText('French') !== null,
    )

    const englishLanguage = languages.find(
      (language) => within(language).queryByText('English') !== null,
    )

    const frenchLevelInput = within(frenchLanguage).getByTestId('level')
    const englishLevelInput = within(englishLanguage).getByTestId('level')
    fireEvent.change(frenchLevelInput, { target: { value: newUserLanguage.level } })
    fireEvent.change(englishLevelInput, { target: { value: updatedUserLanguage.level } })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(postRequestFunc).toHaveBeenCalledTimes(1)
      expect(postRequestFunc).toHaveBeenCalledWith({
        code: newUserLanguage.code,
        level: newUserLanguage.level,
      })
      expect(putRequestFunc).toHaveBeenCalledTimes(1)
      expect(putRequestFunc).toHaveBeenCalledWith({
        level: updatedUserLanguage.level,
      })
    })
  })
})
