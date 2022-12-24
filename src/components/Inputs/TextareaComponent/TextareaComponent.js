import React from 'react'
import classnames from 'classnames'

import styles from './index.module.css'

const TextareaComponent = React.forwardRef(({ className, ...restProps }, ref) => {
  return (
    <textarea
      {...restProps}
      ref={ref}
      wrap="soft"
      className={classnames(className, styles.textareaComponent)}
    />
  )
})

export { TextareaComponent }
