import React from 'react'

import { AddIcon } from '../icons/AddIcon'

import styles from './index.module.css'

export const AddCardComponent = ({ onClick }) => {
  return (
    <div className={styles.addCardButton}>
      <AddIcon onClick={onClick} data-testid="addIcon" />
    </div>
  )
}
