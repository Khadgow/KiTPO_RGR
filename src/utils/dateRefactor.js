import { format } from 'date-fns'

import { dateFormat } from 'constans'

export const dateRefactor = (object) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    acc[key] = value instanceof Date ? format(value, dateFormat) : value
    return acc
  }, {})
