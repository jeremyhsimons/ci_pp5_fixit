import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CreatePostForm = () => {
  const [errors, setErrors] = useState();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const {title, content, image} = postData;


  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    })
  };
  return (
    <Form>
      <Container>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title"  value={title} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name="content"  value={content} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Upload an image</Form.Label>
          <Form.File id="image-upload" accept="image/*"  ref={inputImage}></Form.File>
        </Form.Group>
        <Button type="submit">Save</Button>
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </Container>
    </Form>
  );
}

export default CreatePostForm