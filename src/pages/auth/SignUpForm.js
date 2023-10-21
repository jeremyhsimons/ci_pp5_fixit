import { React, useState } from 'react';
import { Form, Button, Alert, Container, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';

import buttonStyles from '../../styles/Button.module.css'
import formStyles from '../../styles/SignUpSignIn.module.css'
import tools from '../../assets/signup.webp'

const SignUpForm = () => {
  useRedirect('loggedIn');
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({

  });

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
        ...signUpData,
        [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post('/dj-rest-auth/registration/', signUpData)
        history.push('/signin');
    } catch(err) {
        setErrors(err.response?.data);

    }
  }

  return (
    <div>
      <Container className={`text-center ${formStyles.Card}`}>
        <Image className={formStyles.Image} src={tools} rounded/>
      </Container>
      <Container className={formStyles.Card}>
        <h1 className='d-flex justify-content-center text-center'>Sign up to Fixit.</h1>
        <Form onSubmit={handleSubmit}>
          <Container className={formStyles.Fields}>
            <Form.Group controlId="username">
                <Form.Control 
                    type="text" 
                    aria-label="username"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.username?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
            <Form.Group controlId="password1">
                <Form.Control 
                    type="password"
                    aria-label="password"
                    placeholder="Password" 
                    name="password1" 
                    value={password1}
                    onChange={handleChange}

                />
            </Form.Group>
            {errors.password1?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
            <Form.Group controlId="password2">
                <Form.Control 
                    type="password"
                    aria-label="confirm password"
                    placeholder="Re-enter your Password" 
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.password2?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
            <Button className={`${buttonStyles.Button}`} variant="primary" type="submit">
                Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
          </Container>
        </Form>
      </Container>
    </div>
  )
}

export default SignUpForm