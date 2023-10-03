import React, { useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';

const CreatePostForm = () => {
  const [errors, setErrors] = useState();
  const history = useHistory();
  const inputImage = useRef(null);
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
    formData.append('image', inputImage.current.files[0])

    try {
      const {data} = await axiosReq.post('/posts/', formData);
      history.push(`/posts/${data.id}`)
    } catch (err) {
      console.log(err)
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
    }
  }

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
          <Form.File id="image-upload" accept="image/*" ref={inputImage} onChange={handleChangeImage}></Form.File>
        </Form.Group>
        <Button type="submit">Save</Button>
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </Container>
    </Form>
  );
}

export default CreatePostForm