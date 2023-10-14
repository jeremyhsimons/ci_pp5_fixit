import { React, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import buttonStyles from '../../styles/Button.module.css'

const SignInForm = () => {

  const setCurrentUser = useSetCurrentUser();
  useRedirect('loggedIn')

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({

  });

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
        ...signInData,
        [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const {data} = await axios.post('/dj-rest-auth/login/', signInData)
        setCurrentUser(data.user)
        history.goBack();
    } catch(err) {
        setErrors(err.response?.data);
    }
  }

  return (
    <div>
        <h1>Sign In to Fixit.</h1>
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
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    value={password}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.password?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
            <Button className={buttonStyles.Button} variant="primary" type="submit">
                Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
        </Form>
    </div>
  )
}

export default SignInForm