import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import styles from '../../styles/SignUpSignIn.module.css'
import buttonStyles from '../../styles/Button.module.css'
import Message from "../../components/Message";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      setShowMessage(true);
      setTimeout(function () {
        history.goBack();
      }, 3000);
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      {showMessage && (
        <Message message="Username updated sucessfully. Taking you back to your profile..."/>
      )}
      <Row className={styles.Card}>
        <Col className="py-2 mx-auto text-center" md={6}>
          <Container>
            <Form onSubmit={handleSubmit} className="my-2 text-center">
              <Form.Group className={`mx-auto ${styles.Fields}`}>
                <Form.Label className={styles.Title}>Change username</Form.Label>
                <Form.Control
                  placeholder="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              {errors?.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <Button
                className={buttonStyles.Button}
                onClick={() => history.goBack()}
              >
                cancel
              </Button>
              <Button
                className={buttonStyles.Button}
                type="submit"
              >
                save
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default UsernameForm;