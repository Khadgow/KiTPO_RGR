import React, { useState } from 'react'

import { render, fireEvent, screen } from 'testUtils/jestUtils'

import { FormStepper } from './index'

const FormStepperWithState = () => {
  const [step, setStep] = useState(0)
  const onIncrement = () => setStep((prevStep) => prevStep + 1)
  const onDecrement = () => setStep((prevStep) => prevStep - 1)
  return <FormStepper step={step} maxStep={3} onIncrement={onIncrement} onDecrement={onDecrement} />
}

const setup = () => render(<FormStepperWithState />)

describe('FormStepper', () => {
  test('Correct amount of step', async () => {
    setup()
    const nextButton = screen.getByText('formStepper.nextStep')
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    expect(await screen.findByText('formStepper.submit')).toBeInTheDocument()
  })
})
