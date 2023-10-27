import React, { useState, useEffect }from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Post from './Post';

import { Col, Container, Row, Image } from 'react-bootstrap';

import CommentForm from '../comments/CommentForm';
import Comment from '../comments/Comment';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { fetchMoreData } from '../../utils/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import PopularProfiles from '../profiles/PopularProfiles';

import spinner from '../../assets/spinner_updated.gif'

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
          axiosReq.get(`/comments/?post=${id}&ordering=-upvotes_count`)
        ])
        setPost({results: [post]})
        setComments(comments)
      } catch(err) {
        // console.log(err);
      }
    }

    handleMount();
  }, [id]);

  return (
    <div>
      <Row>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile/>
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
                <InfiniteScroll
                  children={
                      comments.results.map(comment => (
                          <Comment key={comment.id} {...comment} setPost={setPost} setComments={setComments} />
                      ))
                  }
                  dataLength={comments.results.length}
                  loader={<p>Loading...</p>}
                  hasMore={!!comments.next}
                  next={() => fetchMoreData(comments, setComments)}
                />
              ) : currentUser ? (
                <span>It&rsquo;s pretty quiet here... Why not add a comment?</span>
              ) : (
                <Container className='d-flex justify-content-center'>
                  <Image src={spinner}/>
                </Container>
              )}
            </Container>
          </Col>
        </Row>
    </div>
  )
}

export default PostPage