import React, { useState } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Auth from './components/Auth'
import blogService from './services/blogs'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationClass, setNotificationClass] = useState('')
  const [user, setUser] = useState(null)

  const handleNotification = (notClass, notMessage) => {
    setNotificationClass(notClass)
    setNotificationMessage(notMessage)
    setTimeout(() => {
      setNotificationClass(null)
      setNotificationMessage(null)
    }, 5000)
  }

  const handleUser = (user) => {
    setUser(user)
    blogService.setToken((user ? user.token : ''))
  }

  const blogs = () => {
    return <Blogs notHandler={handleNotification} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} class={notificationClass} />
      <Auth userHandler={handleUser} notHandler={handleNotification} />
      { (user ? blogs() : null) }
    </div>
  )
}

export default App