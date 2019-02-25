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
    console.log(user)
    blogService.setUser(user ? user : '')
  }

  const blogs = () => {
    return <Blogs notHandler={handleNotification} userId={user.id} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notMessage={notificationMessage} notClass={notificationClass} />
      <Auth userHandler={handleUser} notHandler={handleNotification} />
      {(user ? blogs() : null)}
    </div>
  )
}

export default App