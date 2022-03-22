import { useState } from "react"

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (e, handleLogin) => {
        handleLogin(e, username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <>
          <h1>Log in:</h1>
          <form onSubmit={(e) => login(e, handleLogin)}>
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
              <button type='submit'>Login</button>
            </div>
          </form>
        </>
      )
}

export default LoginForm