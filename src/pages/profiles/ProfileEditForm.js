import React, { useState, useEffect, useRef } from 'react'
import { Col, Form, Row, Image, Container, Button, Alert } from 'react-bootstrap'
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    status: "",
    image: "",
  });
  const { name, bio, status, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, status, image } = data;
          setProfileData({ name, bio, status, image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("status", status);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className='text-center' md={6}>
          <Form.Group>
          <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              value={bio}
              onChange={handleChange}
              name="bio"
              rows={7}
            />
          </Form.Group>
          {errors?.bio?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="status" value={status} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="LFH">Looking for help</option>
              <option value="SME">Subject matter expert</option>
              <option value="JB">Just browsing</option>
              <option value="AME">Ask me anything!</option>
              <option value="NA">Not active</option>
            </Form.Control>
          </Form.Group>
          {errors?.category?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
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
          {errors?.image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
      <Row>
        <Col className="ml-auto" sm={6}>
          <Container>
            <Button
              className="text-center"
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
          </Container>
        </Col>
        <Col sm={6}>
          <Container>
            <Button className="mr-auto text-center" type="submit">
              save
            </Button>
          </Container>
        </Col>
      </Row>
      {errors?.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </Form>
  )
}

export default ProfileEditForm