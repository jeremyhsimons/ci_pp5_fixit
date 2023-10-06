import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Post = (props) => {
  const {
    id,
    author,
    bookmark_id,
    category,
    comments_count,
    content,
    created_at,
    image,
    profile_id,
    profile_image,
    title,
    updated_at,
    upvote_id,
    upvotes_count,
    postPage
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === author

  return (
    <div>
      <Card>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              {author}
            </Link>
            <div class="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && postPage && "..."}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} alt={title}/>
         
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {content && <Card.Text className="text-center">{content}</Card.Text>}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Post