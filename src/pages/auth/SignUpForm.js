import React from 'react'
import { Form, Button } from 'react-bootstrap'

const SignUpForm = () => {
  return (
    <div>
        <h1>Sign up to Fixit.</h1>
        <Form>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password1" 
                />
            </Form.Group>
            <Form.Group controlId="password2">
                <Form.Label>Re-enter your Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Re-enter your Password" 
                    name="password2" 
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