import React from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { MoreDropdown } from '../../components/MoreDropdown'
import { axiosRes } from '../../api/axiosDefaults'

const Comment = ({
  profile_id, 
  profile_image, 
  author, 
  updated_at, 
  content,
  upvote_id,
  id,
  setPost,
  setComments,
}) => {

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === author;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setPost(prevPost => ({
        results: [{
          ...prevPost.results[0],
          comments_count: prevPost.results[0].comments_count - 1
        }]
      }));
      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id)
      }));
    } catch (err) {
      console.log(err);
    }
  };

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
            <div>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't upvote your own comment!</Tooltip>}
                >
                  <i className="fa-regular fa-hand-point-up"></i>
                </OverlayTrigger>
              ) : upvote_id ? (
                <span onClick={() => {}}>
                  <i className="fa-solid fa-hand-point-up"></i>
                  {/* Handles un-upvoting the comment */}
                </span>
              ) : currentUser ? (
                <span onClick={() => {}}>
                  <i className="fa-regular fa-hand-point-up"></i>
                  {/* Handles upvoting the comment */}
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to upvote comments!</Tooltip>}
                >
                  <i className="fa-regular fa-hand-point-up"></i>
                  {/* handles users not logged in, and can't upvote */}
                </OverlayTrigger>
              )}
            </div>
          </Media.Body>
          {is_owner && (
            <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete}/>
          )}
        </Media>
      </>
    </div>
  )
}

export default Comment