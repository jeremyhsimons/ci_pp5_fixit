import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Image, Button } from 'react-bootstrap'
import PopularProfiles from './PopularProfiles'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../posts/Post';
import { fetchMoreData } from '../../utils/utils';

const ProfilePage = () => {

  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({results: []})
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const setProfileData = useSetProfileData();
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.profile_owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{data: pageProfile}, {data: profilePosts}] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?author__profile=${id}`),
        ])
        setProfileData(prevState => ({
          ...prevState,
          pageProfile: {results: [pageProfile]}
        }));

        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
    
  }, [id, setProfileData]);

  const mainProfile = (
    <div>
      <h2>{profile?.profile_owner}'s Profile</h2>
      <p>{profile?.status}</p>
      <Image src={profile?.image}/>
      <p>{profile?.bio}</p>
      <p>Posts: {profile?.posts_count}</p>
      <p>Stars: {profile?.stars_count}</p>
      <div>
        {currentUser && !is_owner && (
          profile?.star_id ? (
            <Button onClick={() => {}}>un-star</Button>
          ) : (
            <Button onClick={() => {}}>star</Button>
          )
        )}
      </div>
    </div>
  )

  const mainProfilePosts = (
    <div>
      <h3>Posts by {profile?.profile_owner}</h3>
      {profilePosts?.results.length ? (
        <InfiniteScroll
          children={
            profilePosts.results.map(post => (
              <Post key={post.id} {...post} setPosts={setProfilePosts}/>
            ))
          }
          dataLength={profilePosts.results.length}
          loader={<h3>Loading...</h3>}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <h4>This user hasn't posted yet</h4>
      )}
    </div>
  )

  return (
    <Row>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile/>
        <Container>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </Container>
      </Col>
    </Row>
  )
}

export default ProfilePage