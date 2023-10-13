import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Image, Button } from 'react-bootstrap'
import PopularProfiles from './PopularProfiles'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';

const ProfilePage = () => {

  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const setProfileData = useSetProfileData();
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.profile_owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{data: pageProfile}] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`)
        ])
        setProfileData(prevState => ({
          ...prevState,
          pageProfile: {results: [pageProfile]}
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
    
  }, [id, setProfileData]);

  const mainProfile = (
    <div>
      <p>This is a profile</p>
      <p>{profile?.profile_owner}</p>
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
      <p>The posts for this profile will go here.</p>
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