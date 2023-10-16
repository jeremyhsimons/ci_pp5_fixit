import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form, Image, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';

import buttonStyles from '../../styles/Button.module.css'
import formStyles from '../../styles/CreatePostForm.module.css'

const PostEditForm = () => {
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

  const {id} = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const {data} = await axiosReq.get(`/posts/${id}/`);
        const {title, content, category, image, is_owner} = data;

        is_owner ? setPostData({title, content, category, image}) : history.push('/')
      } catch(err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

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
    if (inputImage?.current?.files[0]){
      formData.append('image', inputImage.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`)
    } catch (err) {
      console.log(err)
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
    }
  }

  return (
    <Form className={formStyles.Card} onSubmit={handleSubmit}>
      <Container className={formStyles.Fields}>
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
        <Button className={buttonStyles.Button} type="submit">Save</Button>
        <Button className={buttonStyles.Button} onClick={() => history.goBack()}>Cancel</Button>
        {errors.non_field_errors?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )}
      </Container>
    </Form>
  );
}

export default PostEditForm