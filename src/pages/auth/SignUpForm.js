import { React, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';

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
        <h1>Sign up to Fixit.</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
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
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
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
                <Form.Label>Re-enter your Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Re-enter your Password" 
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.password2?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
            <Button variant="primary" type="submit">
                Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
        </Form>
    </div>
  )
}

export default SignUpForm