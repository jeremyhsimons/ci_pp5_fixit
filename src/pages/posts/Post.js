import React from 'react'

const Post = (props) => {
  const {
    id,
    author,
    bookmark_id,
    category,
    comments_count,
    content,
    created_at,
    image,
    is_owner,
    profile_id,
    profile_image,
    title,
    updated_at,
    upvote_id,
    upvotes_count
  } = props
  return (
    <div>
      <h1>This is some placeholder text</h1>
    </div>
  )
}

export default Post