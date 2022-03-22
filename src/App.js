import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './utils/message'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import like from './services/likeBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [msg, setMsg] = useState([null, false])
  const [user, setUser] = useState(null)


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

  const handleLogin = async (event, username, password) => {
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

  const handleCreate = async (testBlog) => {
    try {
      await blogService.create(testBlog)
      showMessage(`${testBlog.title} by ${testBlog.author} added`, false)
    } catch (e) {
      showMessage(e.response.data.error, true)
    }

    const response = await blogService.getAll()
    setBlogs(response)
  }

  const delBlog = async (blog) => {
    let result = window.confirm(`Delete ${blog.title}?`)

    if (result) {
      try {
        await blogService.deleteBlog(blog.id)
        showMessage(`${blog.title} by ${blog.author} deleted`, false)
      } catch (e) {
        showMessage(e.response.data.error, true)
      }

      const response = await blogService.getAll()
      setBlogs(response)
    }
  }

  const likeBlog = async (blog) => {
    await like(blog.id)
    showMessage(`You liked ${blog.title}`)

    const response = await blogService.getAll()
    setBlogs(response)
  }
  
  return (
    <div>
      <Message message={msg[0]} error={msg[1]} />

      <Togglable buttonLabel={'Open'} >
        {user === null ?
          <LoginForm handleLogin={handleLogin} /> :
          <div>
            Logged in as {user.username} aka {user.name} <button onClick={() => logout()}>logout</button>
          </div>
        }
      </Togglable>

      <Togglable buttonLabel={'New note'}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>


      <h2>Blogs:</h2>
      {blogs.map((blog) =>
        <div key={blog.id} className={'blog'}>
          <Togglable buttonLabel={'show'} blog={blog}>
            <Blog blog={blog} myFunc={() => delBlog(blog)} likeFunc={() => likeBlog(blog)}/>
          </Togglable>
        </div>
      )}
    </div>
  )
}
export default App