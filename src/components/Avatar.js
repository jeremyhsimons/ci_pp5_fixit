import React from 'react'
import styles from '../styles/Avatar.module.css'

const Avatar = (props) => {
  const { src, height, text } = props;

  return (
    <span>
        <img className={styles.Avatar} src={src} height={height} width={height} alt="avatar"/>
        <p><strong className={`ml-3 ${styles.Name}`}>{text}</strong></p>
    </span>
  )
}

export default Avatar