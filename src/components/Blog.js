import React from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, myFunc, likeFunc }) => (
  <div>
    <div>{blog.title}</div>
    <div>{blog.author}</div>
    <div>{blog.url}</div>
    <div id='likes'>{blog.likes} <button onClick={likeFunc}>Like</button></div>
    <button className='delete' onClick={myFunc}>Delete</button>
  </div>
)

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  //myFunc: propTypes.func.isRequired,
  //likeFunc: propTypes.func.isRequired
}

export default Blog