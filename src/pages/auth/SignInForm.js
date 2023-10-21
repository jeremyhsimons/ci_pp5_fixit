import { React, useState } from 'react';
import { Form, Button, Alert, Container, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import buttonStyles from '../../styles/Button.module.css'
import formStyles from '../../styles/SignUpSignIn.module.css'
import { setTokenTimestamp } from '../../utils/utils';
import tools from '../../assets/signup.webp'

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
        const {data} = await axios.post('/dj-rest-auth/login/', signInData);
        setCurrentUser(data.user);
        setTokenTimestamp(data);
        history.goBack();
    } catch(err) {
        setErrors(err.response?.data);
    }
  }

  return (
    <div>
      <Container className={`my-1 text-center ${formStyles.Card}`}>
        <Image className={formStyles.Image} src={tools} rounded/>
      </Container>
      <Container className={` ${formStyles.Card}`}>
        <h1 className="d-flex justify-content-center text-center">Sign In to Fixit.</h1>
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
            <Form.Group controlId="password">
                <Form.Control 
                    type="password"
                    aria-label="password"
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
          </Container>
        </Form>
      </Container>
    </div>
  )
}

export default SignInForm