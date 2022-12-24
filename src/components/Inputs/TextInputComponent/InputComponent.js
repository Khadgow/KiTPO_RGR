import React from 'react'

export const InputComponent = React.forwardRef((props, ref) => <input ref={ref} {...props} />)
