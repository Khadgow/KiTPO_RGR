import React from 'react'
import { fireEvent } from '@testing-library/react'

import { render, screen } from 'testUtils'

import { ProfileComponent } from './index'

const updateButtonHandler = jest.fn()

const setup = () => render(<ProfileComponent updateButtonHandler={updateButtonHandler} />)

describe('ProfileComponent', () => {
  test('Update button is working', async () => {
    setup()

    const updateButton = screen.getByText('profilePage.updateButton')

    fireEvent.click(updateButton)
    expect(updateButtonHandler).toHaveBeenCalled()
  })
})
