import React from 'react'

import { render, fireEvent, waitFor, screen } from 'testUtils/jestUtils'

import { AddCardComponent } from './index'

const onClick = jest.fn()
const setup = () => render(<AddCardComponent onClick={onClick} />)

describe('AddCardComponent', () => {
  test('Add button is working', async () => {
    setup()
    const addIcon = screen.getByTestId('addIcon')
    fireEvent.click(addIcon)
    expect(onClick).toHaveBeenCalled()
  })
})
