import React, { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { FormStepper } from 'components/FormStepper'
import selectors from 'ducks/multiStepForm/selectors'
import { actions } from 'ducks/multiStepForm/slice'

const BasicMultiStepForm = ({ methods, onSubmitHandler, children }) => {
  const { handleSubmit } = methods
  const dispatch = useDispatch()
  const step = useSelector(selectors.selectStep)

  const onDecrement = useCallback(() => {
    dispatch(actions.decrementStep())
  }, [dispatch])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {children}
        <FormStepper maxStep={3} onDecrement={onDecrement} step={step} />
      </form>
    </FormProvider>
  )
}
export { BasicMultiStepForm }
