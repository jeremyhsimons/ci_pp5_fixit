import React, { useRef, useState } from 'react'
import { Button, Container, Form, Image, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';

import buttonStyles from '../../styles/Button.module.css'

const CreatePostForm = () => {
  useRedirect('loggedOut');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const inputImage = useRef(null);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const {title, content, category, image} = postData;

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    })
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title)
    formData.append('content', content)
    formData.append('category', category)
    formData.append('image', inputImage.current.files[0])

    try {
      const {data} = await axiosReq.post(
        '/posts/', formData);
      history.push(`/posts/${data.id}`)
    } catch (err) {
      console.log(err)
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title"  value={title} onChange={handleChange}/>
        </Form.Group>
        {errors.title?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group controlId="title">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name="content" value={content} onChange={handleChange}/>
        </Form.Group>
        {errors.content?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" name="category" value={category} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="BC">Bikes and Cars</option>
            <option value="EC">Electronics</option>
            <option value="DIY">DIY</option>
          </Form.Control>
        </Form.Group>
        {errors.category?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group>
          {image ? (
            <>
              <figure>
                <Image src={image} rounded/>
              </figure>
            </>
          ) : (
            <Form.Label>Upload an image</Form.Label>
          ) }
          <Form.File id="image-upload" accept="image/*" ref={inputImage} onChange={handleChangeImage}></Form.File>
        </Form.Group>
        {errors.image?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
        <Button className={buttonStyles.Button} type="submit">Create</Button>
        <Button className={buttonStyles.Button} onClick={() => history.goBack()}>Cancel</Button>
        {errors.non_field_errors?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
      </Container>
    </Form>
  );
}

export default CreatePostForm