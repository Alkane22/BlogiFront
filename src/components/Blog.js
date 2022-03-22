import React from 'react'

const Blog = ({blog, myFunc}) => (
  <div>
    <div>{blog.title}</div>
    <div>{blog.author}</div>
    <div>{blog.url}</div>
    <div>{blog.likes} <button>Like</button></div>
    <button onClick={myFunc}>Delete</button>
  </div>  
)

export default Blog