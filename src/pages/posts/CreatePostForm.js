import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap';

const CreatePostForm = () => {
  const [errors, setErrors] = useState();
  return (
    <Form>
      <Container>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" className={styles.Input} value={title} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name="content" className={styles.Input} value={content} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Upload an image</Form.Label>
          <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={inputImage}></Form.File>
        </Form.Group>
      </Container>
    </Form>
  );
}

export default CreatePostForm