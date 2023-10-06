import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from '../../api/axiosDefaults';

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
    postPage,
    setPost,
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === author

  const handleUpvote = async () => {
    try {
      const {data} = await axiosRes.post('/post-upvotes/', {post:id})
      setPost((prevPost) => ({
        ...prevPost,
        results: prevPost.results.map((post) => {
          return post.id === id
          ? {...post, upvotes_count: post.upvotes_count + 1, upvote_id: data.id}
          : post;
        })
      }))
    } catch(err) {
      console.log(err)
    }
  }

  const handleRemoveUpvote = async () => {
    try {
      await axiosRes.delete(`/post-upvotes/${upvote_id}/`)
      setPost((prevPost) => ({
        ...prevPost,
        results: prevPost.results.map((post) => {
          return post.id === id
          ? {...post, upvotes_count: post.upvotes_count - 1, upvote_id: null}
          : post;
        })
      }))
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              {author}
            </Link>
            <div className="d-flex align-items-center">
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
                <i className="fa-regular fa-hand-point-up"></i>
              </OverlayTrigger>
            ) : upvote_id ? (
              <span onClick={handleRemoveUpvote}>
                <i className="fa-solid fa-hand-point-up"></i>
                {/* Handles un-upvoting the post */}
              </span>
            ) : currentUser ? (
              <span onClick={handleUpvote}>
                <i className="fa-regular fa-hand-point-up"></i>
                {/* Handles upvoting the post */}
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to upvote posts!</Tooltip>}
              >
                <i className="fa-regular fa-hand-point-up"></i>
                {/* handles users not logged in, and can't upvote */}
              </OverlayTrigger>
            )}
            {upvotes_count}
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't bookmark your own post!</Tooltip>}
              >
                <i class="fa-regular fa-bookmark"></i>
              </OverlayTrigger>
            ) : bookmark_id ? (
              <span onClick={() => {}}>
                <i class="fa-solid fa-bookmark"></i>
                {/* Handles un-upvoting the post */}
              </span>
            ) : currentUser ? (
              <span onClick={() => {}}>
                <i class="fa-regular fa-bookmark"></i>
                {/* Handles upvoting the post */}
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to bookmark posts!</Tooltip>}
              >
                <i class="fa-regular fa-bookmark"></i>
                {/* handles users not logged in, and can't upvote */}
              </OverlayTrigger>
            )}
            <Link to={`/posts/${id}`}>
              <i className='far fa-comments'></i>
            {comments_count}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Post