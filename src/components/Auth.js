import React, { useState, useEffect } from 'react'
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const Auth = ({ userHandler, notHandler }) => {

  const username = useField('text')
  const password = useField('password')

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
      userHandler(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.params.value,
        password: password.params.value
      })
      console.log('Logging in user', user.username)
      setName(user.name)
      setLogged(true)
      window.localStorage.setItem(storageKeyUser, JSON.stringify(user))
      userHandler(user)
      username.reset()
      password.reset()
    } catch (exception) {
      notHandler('error', 'Invalid username or password.')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      const logoutee = JSON.parse(window.localStorage.getItem(storageKeyUser))
      console.log('Logging out user', logoutee.username)
      setLogged(false)
      window.localStorage.removeItem(storageKeyUser)
      userHandler(null)
    } catch (exception) {
      notHandler('error', 'Unable to logout. Strange.')
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <table>
            <tbody>
              <tr>
                <td>Username</td>
                <td><input size="20" name="Username" {...username.params} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input size="20" name="Password" {...password.params} /></td>
              </tr>
              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  <button type="submit">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p />
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

Auth.propTypes = {
  userHandler: PropTypes.func.isRequired,
  notHandler: PropTypes.func.isRequired
}

export default Auth