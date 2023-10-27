import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import styles from '../styles/Message.module.css'

const Message = ({message}) => {

  const [show, setShow] = useState(true);

  const handeClose = (event) => {
    event.preventDefault();
    setShow(false);
  };

  return (
    <div className={!show && styles.Hide}>
      <Alert variant='warning' onClick={handeClose}>{message}</Alert>
    </div>
  )
}

export default Message