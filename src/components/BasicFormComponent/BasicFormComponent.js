import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export const BasicFormComponent = ({
  onSubmit,
  children,
  validationSchema,
  defaultValues,
  ...rest
}) => {
  const methods = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues,
  })

  return (
    <FormProvider {...methods}>
      <form data-testid={rest['data-testid']} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}
