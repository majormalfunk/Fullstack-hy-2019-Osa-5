import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationClass, setNotificationClass] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const storageKeyUser = 'loggedBlogUser'

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (notClass, notMessage) => {
    setNotificationClass(notClass)
    setNotificationMessage(notMessage)
    setTimeout(() => {
      setNotificationClass(null)
      setNotificationMessage(null)
    }, 5000)

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('Logging in ', user.name)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(storageKeyUser, JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotification('error', 'Invalid username or password.')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      console.log('Logging out ', user.name)
      setUser(null)
      blogService.setToken(null)
      window.localStorage.removeItem(storageKeyUser)
      this.props.history.push("/login");
    } catch (exception) {
      handleNotification('error', 'Unable to logout. Strange.')
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <p />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  const logoutForm = () => {
    return (
      <div>
        <p>{user.name} logged in</p>
        <p />
        <form onSubmit={handleLogout}>
          <button type="submit">Logout</button>
        </form>
        <p />
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} class={notificationClass} />
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} class={notificationClass} />
        {logoutForm()}
        <Blogs notHandler={handleNotification}/>
      </div>
    )
  }
}

export default App