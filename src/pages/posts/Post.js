import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';

import avatarStyles from '../../styles/Avatar.module.css'
import postStyles from '../../styles/Post.module.css'
import Avatar from '../../components/Avatar';

const Post = (props) => {
  const {
    id,
    author,
    bookmark_id,
    comments_count,
    content,
    image,
    profile_id,
    profile_image,
    title,
    updated_at,
    upvote_id,
    upvotes_count,
    postPage,
    setPosts,
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === author
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`)
      history.goBack()
    } catch(err) {
      // console.log(err)
    }
  }

  const handleUpvote = async () => {
    try {
      const {data} = await axiosRes.post('/post-upvotes/', {post:id})
      setPosts((prevPost) => ({
        ...prevPost,
        results: prevPost.results.map((post) => {
          return post.id === id
          ? {...post, upvotes_count: post.upvotes_count + 1, upvote_id: data.id}
          : post;
        })
      }))
    } catch(err) {
      // console.log(err)
    }
  }

  const handleBookmark = async () => {
    try {
      const {data} = await axiosRes.post('/bookmarks/', {post:id})
      setPosts((prevPost) => ({
        ...prevPost,
        results: prevPost.results.map((post) => {
          return post.id === id
          ? {...post, bookmark_id: data.id}
          : post;
        })
      }))
    } catch(err) {
      // console.log(err)
    }
  }

  const handleRemoveUpvote = async () => {
    try {
      await axiosRes.delete(`/post-upvotes/${upvote_id}/`)
      setPosts((prevPost) => ({
        ...prevPost,
        results: prevPost.results.map((post) => {
          return post.id === id
          ? {...post, upvotes_count: post.upvotes_count - 1, upvote_id: null}
          : post;
        })
      }))
    } catch(err) {
      // console.log(err)
    }
  }

  const handleRemoveBookmark = async () => {
    try {
      await axiosRes.delete(`/bookmarks/${bookmark_id}/`)
      setPosts((prevPost) => ({
        ...prevPost,
        results: prevPost.results.map((post) => {
          return post.id === id
          ? {...post, bookmark_id: null}
          : post;
        })
      }))
    } catch(err) {
      // console.log(err)
    }
  }

  return (
    <div>
      <Card className={postStyles.Post}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link className={avatarStyles.Link} to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} text={author} height={100} />
            </Link>
            <div className="d-flex align-items-center">
              <span className={`${postStyles.Title} ${postStyles.Date}`}>{updated_at}</span>
              {is_owner && postPage && (
                <MoreDropdown 
                  handleEdit={handleEdit} 
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        
        <Card.Body className={postStyles.TextPanel}>
          {title && <Card.Title className={`text-center ${postStyles.Title}`}>{title}</Card.Title>}
          {content && <Card.Text className="text-center">{content}</Card.Text>}
          <div className='d-flex justify-content-center align-items-center'>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can&rsquo;t bookmark your own post!</Tooltip>}
              >
                <i className="fa-regular fa-bookmark mr-5"></i>
              </OverlayTrigger>
            ) : bookmark_id ? (
              <span onClick={handleRemoveBookmark}>
                <i className="fa-solid fa-bookmark mr-5"></i>
                {/* Handles un-upvoting the post */}
              </span>
            ) : currentUser ? (
              <span onClick={handleBookmark}>
                <i className="fa-regular fa-bookmark mr-5"></i>
                {/* Handles upvoting the post */}
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to bookmark posts!</Tooltip>}
              >
                <i className="fa-regular fa-bookmark mr-5"></i>
                {/* handles users not logged in, and can't upvote */}
              </OverlayTrigger>
            )}
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can&rsquo;t upvote your own post!</Tooltip>}
              >
                <i className="fa-regular fa-hand-point-up"></i>
              </OverlayTrigger>
            ) : upvote_id ? (
              <span onClick={handleRemoveUpvote}>
                <i className="fa-solid fa-hand-point-up "></i>
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
            <Link to={`/posts/${id}`} className={postStyles.CommentIcon}>
              <i className='far fa-comments ml-5'></i>
              {comments_count}
            </Link>
          </div>
          <Link to={`/posts/${id}`}>
            <Card.Img className={postStyles.Image} src={image} alt={title}/>
          </Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Post