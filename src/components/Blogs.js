import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleTitleChange = (event) => {
    //console.log("Title:", event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    //console.log("Author:", event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    //console.log("URL:", event.target.value)
    setNewURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    console.log('New blog:', blogObject)

    blogService
      .create(blogObject)
      .then(created => {
        setBlogs(blogs.concat(created))
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
        props.notHandler('success', `A new blog ${created.title} was added`)
      })
      .catch(error => {
        console.log(error.response.data.error)
        props.notHandler('error', error.response.data.error)
      })

  }

  const blogList = () => {
    return (
      <div>
        <table>
          <tbody>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <table>
          <tbody>
            <tr>
              <td>Title:</td>
              <td>
                <input value={newTitle} onChange={handleTitleChange} />
              </td>
            </tr>
            <tr>
              <td>Author:</td>
              <td>
                <input value={newAuthor} onChange={handleAuthorChange} />
              </td>
            </tr>
            <tr>
              <td>URL:</td>
              <td>
                <input value={newURL} onChange={handleURLChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
      <p />
      {blogList()}
    </div>
  )

}

export default Blogs