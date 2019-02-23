import React, { useState, useEffect } from 'react'

import loginService from '../services/login'

const Auth = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [logged, setLogged] = useState(false)

  const storageKeyUser = 'loggedBlogUser'

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
    // console.log('Checking to see if user already in local storage')
    if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
      // console.log('OMG! It is! ', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      if (user.name) {
        setName(user.name)
      }
      setLogged(true)
      props.userHandler(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('Logging in user ', username)
      setName(user.name)
      setLogged(true)
      window.localStorage.setItem(storageKeyUser, JSON.stringify(user))
      props.userHandler(user)
      setUsername('')
      setPassword('')
      setName('')
    } catch (exception) {
      props.notHandler('error', 'Invalid username or password.')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      const logoutee = JSON.parse(window.localStorage.getItem(storageKeyUser))
      console.log('Logging out user ', logoutee.username)
      setLogged(false)
      window.localStorage.removeItem(storageKeyUser)
      props.userHandler(null)
    } catch (exception) {
      props.notHandler('error', 'Unable to logout. Strange.')
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
        <p>{name} logged in</p>
        <p />
        <form onSubmit={handleLogout}>
          <button type="submit">Logout</button>
        </form>
        <p />
      </div>
    )
  }

  if (!logged) {
    return (
      <div>{loginForm()}</div>
    )
  } else {
    return (
      <div>{logoutForm()}</div>
    )
  }


}

export default Auth