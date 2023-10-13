import React from 'react'
import { Col, Row } from 'react-bootstrap'
import PopularProfiles from './PopularProfiles'

const ProfilePage = () => {
  return (
    <Row>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile/>
        <Container>
          <p>profile will go here</p>
          <p>profile posts will go here</p>
        </Container>
      </Col>
    </Row>
  )
}

export default ProfilePage