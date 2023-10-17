import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { axiosRes } from "../../api/axiosDefaults";

import styles from '../../styles/CommentForm.module.css'
import buttonStyles from '../../styles/Button.module.css'

function CommentForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className={`mt-2 d-flex justify-content-center ${styles.Form}`} onSubmit={handleSubmit}>
      <Form.Group className="">
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <p>Your profile</p>
          </Link>
          <Form.Control
            className={styles.Text}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`btn d-block ml-auto ${buttonStyles.Button}`}
        disabled={!content.trim()}
        type="submit"
      >
        Comment
      </button>
    </Form>
  );
}

export default CommentForm;