import React from 'react'
import { useForm } from 'react-hook-form'

import { render, fireEvent, waitFor, screen } from 'testUtils/jestUtils'

import { BasicFormComponent } from '../BasicFormComponent/BasicFormComponent'

import {
  DatePickerFormComponent,
  InputFormComponent,
  NumberInputFormComponent,
  TextareaFormComponent,
} from './index'

const isAllowed = ({ floatValue, value }) => (!floatValue || floatValue <= 5) && value.length < 2
const submitHandler = jest.fn()

const AllInputsForm = () => {
  const methods = useForm()
  return (
    <BasicFormComponent {...methods} onSubmit={submitHandler} data-testid="form">
      <DatePickerFormComponent name="date" data-testid="date" />
      <InputFormComponent name="input" data-testid="input" />
      <NumberInputFormComponent name="number" data-testid="number" />
      <TextareaFormComponent name="textarea" data-testid="textarea" />
    </BasicFormComponent>
  )
}
const FormWithNumberInput = () => {
  const methods = useForm()
  return (
    <BasicFormComponent {...methods} onSubmit={submitHandler} data-testid="form">
      <NumberInputFormComponent
        name="incorrectNumber"
        data-testid="incorrectNumber"
        isAllowed={isAllowed}
        allowNegative={false}
      />
      <NumberInputFormComponent
        name="correctNumber"
        data-testid="correctNumber"
        isAllowed={isAllowed}
        allowNegative={false}
      />
    </BasicFormComponent>
  )
}

const setupAllInputs = () => render(<AllInputsForm />)
const setupNumberInput = () => render(<FormWithNumberInput />)

describe('Inputs', () => {
  test('Expect correct value', async () => {
    setupAllInputs()
    const datePicker = screen.getByTestId('date')
    const input = screen.getByTestId('input')
    const numberInput = screen.getByTestId('number')
    const textarea = screen.getByTestId('textarea')
    const form = screen.getByTestId('form')

    fireEvent.change(datePicker, { target: { value: '01/01/2000' } })
    fireEvent.change(input, { target: { value: 'some text' } })
    fireEvent.change(numberInput, { target: { value: '123' } })
    fireEvent.change(textarea, { target: { value: 'some text' } })
    fireEvent.submit(form)
    await waitFor(() => {
      expect(datePicker.value).toBe('01/01/2000')
      expect(input.value).toBe('some text')
      expect(numberInput.value).toBe('123')
      expect(textarea.value).toBe('some text')
      expect(submitHandler).toHaveBeenCalled()
      expect(submitHandler).toHaveBeenCalledWith(
        {
          date: new Date('01/01/2000'),
          input: 'some text',
          number: 123,
          textarea: 'some text',
        },
        expect.anything(),
      )
    })
  })
  test('Correct value in number input', async () => {
    setupNumberInput()
    const incorrectNumberInput = screen.getByTestId('incorrectNumber')
    const correctNumberInput = screen.getByTestId('correctNumber')
    const form = screen.getByTestId('form')

    fireEvent.change(incorrectNumberInput, { target: { value: '123' } })
    fireEvent.change(correctNumberInput, { target: { value: '4' } })
    fireEvent.submit(form)
    await waitFor(() => {
      expect(incorrectNumberInput.value).toBe('')
      expect(correctNumberInput.value).toBe('4')
      expect(submitHandler).toHaveBeenCalled()
      expect(submitHandler).toHaveBeenCalledWith(
        {
          incorrectNumber: undefined,
          correctNumber: 4,
        },
        expect.anything(),
      )
    })
  })
})
