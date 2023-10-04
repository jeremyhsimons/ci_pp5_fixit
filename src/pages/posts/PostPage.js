import React, { useState, useEffect }from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';

const PostPage = () => {
  const {id} = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try{
        const [{data: post}] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
        ])
        setPost({results: [post]})
        console.log(post)
      } catch(err) {
        console.log(err)
      }
    }

    handleMount();
  }, [id]);

  return (
    <div>
      <p>Popular profiles component for mobiles</p>
      <p>Post component</p>
      <p>Popular profiles component for desktop</p>
    </div>
  )
}

export default PostPage