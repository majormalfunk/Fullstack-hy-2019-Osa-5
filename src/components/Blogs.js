import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [showForm, setShowForm] = useState(false)

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

  const handleShowForm = (event) => {
    setShowForm(!showForm)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    console.log('New blog:', blogObject)

    try {
      const created = await blogService.create(blogObject)
      console.log('Created blog', created)
      setBlogs(blogs.concat(created))
      setNewTitle('')
      setNewAuthor('')
      setNewURL('')
      props.notHandler('success', `A new blog ${created.title} was added`)
    } catch (error) {
      console.log(error.response.data.error)
      props.notHandler('error', error.response.data.error)
    }
  }

  const blogList = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} notHandler={props.notHandler} />
        )}
      </div>
    )
  }

  const CreateNewButton = () => {
    return (
      <div>
        <button type="button" onClick={handleShowForm}>Create New</button>
      </div>
    )
  }

  const Cancel = () => {
    return (
      <div>
        <button type="button" onClick={handleShowForm}>Cancel</button>
      </div>
    )
  }

  const NewBlogForm = () => {
    return (
      <div>
        <form onSubmit={addBlog}>
          <table>
            <tbody>
              <tr>
                <td>Title:</td>
                <td>
                  <input value={newTitle} onChange={handleTitleChange} size="70" />
                </td>
              </tr>
              <tr>
                <td>Author:</td>
                <td>
                  <input value={newAuthor} onChange={handleAuthorChange} size="70" />
                </td>
              </tr>
              <tr>
                <td>URL:</td>
                <td>
                  <input value={newURL} onChange={handleURLChange} size="70" />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button type="submit">Create</button> <Cancel />
          </div>
        </form>
        <p />
      </div>
    )
  }

  return (
    <div>
      <div id="formstyle">
        {showForm ? NewBlogForm() : CreateNewButton()}
      </div>
      <div>
        {blogList()}
      </div>
    </div>
  )

}

export default Blogs