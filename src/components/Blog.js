import React from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, myFunc, likeFunc }) => (
  <div>
    <div>{blog.title}</div>
    <div>{blog.author}</div>
    <div>{blog.url}</div>
    <div>{blog.likes} <button onClick={likeFunc}>Like</button></div>
    <button onClick={myFunc}>Delete</button>
  </div>
)

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  myFunc: propTypes.func.isRequired,
  likeFunc: propTypes.func.isRequired
}

export default Blog