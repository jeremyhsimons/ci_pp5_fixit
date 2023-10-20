import React, { useState, useEffect, useRef } from 'react'
import { Col, Form, Row, Image, Container, Button, Alert } from 'react-bootstrap'
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';

import formStyles from '../../styles/ProfileEditForm.module.css'
import buttonStyles from '../../styles/Button.module.css'

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
        <Col  md={6}>
          <Container className={`${formStyles.Card}`}>
            <Form.Group className={` ${formStyles.Fields}`} md={6}>
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
            <Form.Group className={` ${formStyles.Fields}`}>
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
          </Container>
        </Col>
        <Col md={6}>
          <Container className={formStyles.Card}>
            <Form.Group className={formStyles.Fields}>
              {image && (
                <figure>
                  <Image className={formStyles.Image} src={image} fluid />
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
          </Container>
        </Col>
      </Row>
      <Row>
        <Container className={`d-flex justify-content-center`}>
          <Button
            className={buttonStyles.Button}
            onClick={() => history.goBack()}
          >
            cancel
          </Button>
          <Button className={buttonStyles.Button} type="submit">
            save
          </Button>
        </Container>
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