import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({message}) => {
  return (
    <div>
      <Alert variant='warning'>{message}</Alert>
    </div>
  )
}

export default Message