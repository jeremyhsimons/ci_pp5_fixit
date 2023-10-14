import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

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
        <Col md={6}>
          <Form.Group>
            {image && (
              <figure>
                <Image src={image} fluid />
              </figure>
            )}
            <div>
                <Form.Label
                  className={`btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default ProfileEditForm