import React from 'react'

import { EditIcon } from 'components/icons/EditIcon'
import { LikedIcon } from 'components/icons/LikedIcon'
import { UnlikedIcon } from 'components/icons/UnlikedIcon'
import { Roles } from 'constans'

import styles from './index.module.css'

export const PostComponent = ({ post, role, editButtonHandler, likeButtonHandler }) => {
  const { title, content, liked, id, totalLikes } = post
  return (
    <div className={styles.cardItem} key={id}>
      <p>{title}</p>
      <p>{content}</p>

      <div className={styles.cardItemBottom}>
        {role === Roles.admin && (
          <button
            onClick={editButtonHandler(id)}
            className={styles.iconButton}
            type="button"
            data-testid="editButton"
          >
            <EditIcon />
          </button>
        )}
        <button
          onClick={likeButtonHandler(id)}
          className={styles.iconButton}
          type="button"
          data-testid="likeButton"
        >
          <p className={styles.likeCount}>{totalLikes}</p>
          {liked ? <LikedIcon /> : <UnlikedIcon />}
        </button>
      </div>
    </div>
  )
}
