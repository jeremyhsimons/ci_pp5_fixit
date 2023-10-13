import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import PopularProfiles from './PopularProfiles'
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const ProfilePage = () => {

  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    setHasLoaded(true);
  })

  const mainProfile = (
    <div>
      <p>This is a profle</p>
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