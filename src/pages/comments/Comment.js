import React, {useState} from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from './CommentEditForm';

import styles from '../../styles/Comment.module.css';
import Avatar from '../../components/Avatar';

const Comment = ({
  profile_id, 
  profile_image, 
  author, 
  updated_at, 
  content,
  upvote_id,
  upvotes_count,
  id,
  setPost,
  setComments,
}) => {

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === author;
  const [ showEditForm, setShowEditForm] = useState(false);

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
      // console.log(err);
    }
  };

  const handleUpvote = async () => {
    try {
      const {data} = await axiosRes.post('/comment-upvotes/', {comment:id});
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
          ? {...comment, upvotes_count: comment.upvotes_count + 1, upvote_id: data.id}
          : comment;
        })
      }))
    } catch(err) {
      // console.log(err);
    }
  };

  const handleRemoveUpvote = async () => {
    try {
      await axiosRes.delete(`/comment-upvotes/${upvote_id}/`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
          ? {...comment, upvotes_count: comment.upvotes_count - 1, upvote_id: null}
          : comment;
        })
      }))
    } catch(err) {
      // console.log(err);
    }
  };

  return (
    <div>
      <>
        <hr />
        <Media className={styles.Comment}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar height={60} src={profile_image} text={author}/>
          </Link>
          <Media.Body className="align-self-center ml-2">
            <span className={styles.Date}>{updated_at}</span>
            {showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p className='my-3'>{content}</p>
            )}
            <div>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can&rsquo;t upvote your own comment!</Tooltip>}
                >
                  <i className="fa-regular fa-hand-point-up"></i>
                </OverlayTrigger>
              ) : upvote_id ? (
                <span onClick={handleRemoveUpvote}>
                  <i className="fa-solid fa-hand-point-up"></i>
                  {/* Handles un-upvoting the comment */}
                </span>
              ) : currentUser ? (
                <span onClick={handleUpvote}>
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
              {upvotes_count}
            </div>
          </Media.Body>
          {is_owner && !showEditForm && (
            <MoreDropdown 
              handleEdit={() => setShowEditForm(true)} 
              handleDelete={handleDelete}
            />
          )}
        </Media>
      </>
    </div>
  );
};

export default Comment;