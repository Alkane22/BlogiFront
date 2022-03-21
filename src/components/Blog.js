import React from 'react'

const Blog = ({blog, myFunc}) => (
  <div>
    {blog.title} {blog.author} <button onClick={myFunc}>Delete</button>
  </div>  
)

export default Blog