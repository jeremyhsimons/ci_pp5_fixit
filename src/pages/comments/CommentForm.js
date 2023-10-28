import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { axiosRes } from "../../api/axiosDefaults";

import styles from '../../styles/CommentForm.module.css'
import buttonStyles from '../../styles/Button.module.css'
import Avatar from "../../components/Avatar";

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
      // console.log(err);
    }
  };

  return (
    <Form className={`mt-2 d-flex justify-content-center align-items-center ${styles.Form}`} onSubmit={handleSubmit}>
      <Form.Group className="">
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} height={50} />
          </Link>
          <Form.Control
            className={styles.Text}
            title="comment form"
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
            cols={50}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`ml-auto ${buttonStyles.Button} ${styles.Submit}`}
        disabled={!content.trim()}
        type="submit"
      >
        Comment
      </button>
    </Form>
  );
}

export default CommentForm;