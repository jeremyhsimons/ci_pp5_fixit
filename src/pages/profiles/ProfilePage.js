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
import { ProfileEditDropdown } from '../../components/MoreDropdown';

import styles from '../../styles/ProfilePage.module.css'

const ProfilePage = () => {

  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({results: []})
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const {setProfileData, handleStar, handleUnStar} = useSetProfileData();
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.profile_owner;

  const askMeStatus = () => {
    return (
      <span>ask me anything</span>
    )
  }
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
    <div className={`text-center ${styles.Page}`}>
      <h2 className={`${styles.Title}`}>{profile?.profile_owner}'s profile</h2>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <div className='text-center'>
        <strong>Status: </strong>
        {profile?.status === "AME" ? (<span>Ask Me anything</span>) : (<span></span>)}
        {profile?.status === "JB" ? (<span>Just Browsing</span>) : (<span></span>)}
        {profile?.status === "LFH" ? (<span>Looking For Help</span>) : (<span></span>)}
        {profile?.status === "SME" ? (<span>Subject Matter Expert</span>) : (<span></span>)}
        {profile?.status === "NA" ? (<span>Not Active</span>) : (<span></span>)}
        {profile?.status === "" ? (<span>No Status Selected</span>) : (<span></span>)}
      </div>
      <Image className={`text-center mt-5 ${styles.Image}`} src={profile?.image}/>
      <p>{profile?.bio}</p>
      <p><strong>Posts:</strong> {profile?.posts_count}</p>
      <p><strong>Stars:</strong> {profile?.stars_count}</p>
      <div>
        {currentUser && !is_owner && (
          profile?.star_id ? (
            <Button onClick={() => handleUnStar(profile)}>un-star</Button>
          ) : (
            <Button onClick={() => handleStar(profile)}>star</Button>
          )
        )}
      </div>
    </div>
  )

  const mainProfilePosts = (
    <div>
      <h3 className={`text-center ${styles.Title}`}>Posts by {profile?.profile_owner}</h3>
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
              <hr/>
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