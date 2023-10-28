import React from 'react';
import styles from '../styles/Avatar.module.css';
import { Image } from 'react-bootstrap';

const Avatar = (props) => {
  const { src, height, text } = props;

  return (
    <span className='text-center'>
      <Image className={styles.Avatar} src={src} height={height} width={height} alt="avatar"/>
      <p><strong className={`${styles.Name}`}>{text}</strong></p>
    </span>
  );
}

export default Avatar