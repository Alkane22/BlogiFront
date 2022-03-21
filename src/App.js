import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './utils/message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState([null, false])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await blogService.getAll()
      setBlogs(response)
    }
    fetchData()
  }, [])

  const showMessage = (message, error) => {
    setMsg([message, error])
    setTimeout(() => {
      setMsg([null, false])
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'blogUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)

      showMessage(`Greetings ${user.username}!`, false)

      setUsername('')
      setPassword('')
    } catch (e) {
      showMessage(e.response.data.error, true)
    }
  }

  useEffect(() => {
    const blogUserJSON = window.localStorage.getItem('blogUser')
    if (blogUserJSON) {
      const user = JSON.parse(blogUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    showMessage(`Goodbye ${user.username}.`, false)
    setUser(null)
    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const testBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService.create(testBlog)
      showMessage(`${title} by ${author} added`, false)
    } catch (e) {
      showMessage(e.response.data.error, true)
    }

    const response = await blogService.getAll()
    setBlogs(response)
  }

  const delBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id)
      showMessage(`${blog.title} by ${blog.author} deleted`, false)
    } catch (e) {
      showMessage(e.response.data.error, true)
    }

    const response = await blogService.getAll()
    setBlogs(response)
  }

  const LoginForm = () => {
    return (
      <>
        <h1>Log in:</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type='submit'>login</button>
          </div>
        </form>
      </>
    )
  }

  const BlogForm = () => {
    return (
      <>
        <h1>New blog:</h1>
        <form onSubmit={handleCreate}>

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

  return (
    <div>
      <Message message={msg[0]} error={msg[1]} />

      {user === null ?
        LoginForm() :
        <div>
          Logged in as {user.username} aka {user.name} <button onClick={() => logout()}>logout</button>
        </div>
      }

      {BlogForm()}

      <h2>Blogs:</h2>
      {blogs.map((blog) =>
        <Blog key={blog.id} blog={blog} myFunc={() => delBlog(blog)} />
      )}
    </div>
  )
}

export default App