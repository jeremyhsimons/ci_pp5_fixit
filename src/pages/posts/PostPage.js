import React, { useState, useEffect }from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Post from './Post';

import { Container } from 'react-bootstrap';

import CommentForm from '../comments/CommentForm';
import Comment from '../comments/Comment';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const PostPage = () => {
  const {id} = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try{
        const [{data: post}, {data: comments}] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
          axiosReq.get(`/comments/?post=${id}`)
        ])
        setPost({results: [post]})
        setComments(comments)
        console.log(post)
      } catch(err) {
        console.log(err)
      }
    }

    handleMount();
  }, [id]);

  return (
    <div>
      <p>Popular profiles component for mobiles</p>
      <Post {...post.results[0]} setPost={setPost} postPage />
      <Container className="">
          {currentUser ? (
            <CommentForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            comments.results.map(comment => (
              <Comment key={comment.id} {...comment}/>
            ))
          ) : currentUser ? (
            <span>It's pretty quiet here... Why not add a comment?</span>
          ) : (
            <span>No comments yet.</span>
          )}
        </Container>
      <p>Popular profiles component for desktop</p>
    </div>
  )
}

export default PostPage