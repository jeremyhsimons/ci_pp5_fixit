import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const ProfileEditForm = () => {


  return (
    <Form>
      <Row>
        <Col className='text-center' md={6}>
          <Form.Group>
          <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={handleChange}
              name="content"
              rows={7}
            />
          </Form.Group>
          <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" name="category" value={category} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="LFH">Looking for help</option>
            <option value="SME">Subject matter expert</option>
            <option value="JB">Just browsing</option>
            <option value="AME">Ask me anything!</option>
            <option value="NA">Not active</option>
          </Form.Control>
        </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default ProfileEditForm