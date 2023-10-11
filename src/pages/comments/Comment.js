import React from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Comment = ({
  profile_id, 
    profile_image, 
    author, 
    updated_at, 
    content,
}) => {
  return (
    <div>
      <>
        <hr />
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <p>Image goes here</p>
          </Link>
          <Media.Body className="align-self-center ml-2">
            <span className="">{author}</span>
            <span className="">{updated_at}</span>
            <p>{content}</p>
          </Media.Body>
        </Media>
      </>
    </div>
  )
}

export default Comment