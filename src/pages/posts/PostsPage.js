import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

import searchStyles from '../../styles/Searchbar.module.css'

function PostsPage({ message, filter="" }) {
  const [ posts, setPosts ] = useState({result: []});
  const [ hasLoaded, setHasLoaded ] = useState(false);
  const {pathname} = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch(err) {
        console.log(err)
      }
    }
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [filter, query, pathname])

  return (
    <Row className="h-100">
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile/>
        <div className={`d-flex align-items-center ${searchStyles.Searchbar}`}>
          <i className={`fas fa-search ${searchStyles.Item}`}></i>
          <Form className={searchStyles.Form} onSubmit={(event) => event.preventDefault()}>
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className={`mr-sm-2 ${searchStyles.Item} ${searchStyles.Search}`}
              placeholder="Search posts"
            />
          </Form>
        </div>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={
                  posts.results.map(post => (
                    <Post key={post.id} {...post} setPosts={setPosts}/>
                  ))
                }
                dataLength={posts.results.length}
                loader={<h3>Loading...</h3>}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
              
            ) : (
              <Container>
                <h2>{message}</h2>
              </Container>
            )}
          </>
        ) : (
          <Container>
            <h2>LOADING...</h2>
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default PostsPage;