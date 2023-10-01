import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const handleChange = (event) => {
    setSignUpData({
        ...signUpData,
        [event.target.name]: event.target.value
    });
  }

  return (
    <div>
        <h1>Sign up to Fixit.</h1>
        <Form>
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
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default SignUpForm