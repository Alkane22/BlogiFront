import { useState } from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const testBlog = {
      title: title,
      author: author,
      url: url
    }
    createBlog(testBlog)
  }

  return (
    <>
      <h1>New blog:</h1>
      <form onSubmit={addBlog}>

            Title:
        <div>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

            Author:
        <div>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

            URL:
        <div>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: propTypes.func.isRequired
}

export default BlogForm