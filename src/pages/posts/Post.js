import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
          <div>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't upvote your own post!</Tooltip>}
              >
                <p>cant upvote your post!</p>
              </OverlayTrigger>
            ) : upvote_id ? (
              <span onClick={() => {}}>
                <p>un-upvote!</p>
                {/* Handles un-upvoting the post */}
              </span>
            ) : currentUser ? (
              <span onClick={() => {}}>
                <p>upvote!</p>
                {/* Handles upvoting the post */}
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to upvote posts!</Tooltip>}
              >
                <p>Log in to upvote!</p>
                {/* handles users not logged in, and can't upvote */}
              </OverlayTrigger>
            )}
            {upvotes_count}
            <Link to={`/posts/${id}`}>
            {comments_count}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Post