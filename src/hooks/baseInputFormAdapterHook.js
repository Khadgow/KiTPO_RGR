import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'

export const useBaseInputFormAdapter = ({ name }) => {
  const { register, control, formState } = useFormContext()
  const { errors } = formState
  const error = get(errors, name)

  return { register, error, control }
}
