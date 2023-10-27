import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({message}) => {

  const [show, setShow] = useState(true);

  const handeClose = (event) => {
    event.preventDefault();
    setShow(false);
  };

  return (
    <div >
      <Alert variant='warning' onClick={handeClose}>{message}</Alert>
    </div>
  )
}

export default Message