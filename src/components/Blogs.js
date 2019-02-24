import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [showForm, setShowForm] = useState(false)

  const fetchAll = async () => {
    const unsorted = await blogService.getAll()
    setBlogs(sortBlogs(unsorted))
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const sortBlogs = (unsorted) => {
    console.log('Sorting blogs')
    return unsorted.sort(function (a, b) { return b.likes - a.likes })
  }

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

    //console.log('New blog:', blogObject)

    try {
      const created = await blogService.create(blogObject)
      //console.log('Created blog', created)
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

  const likeBlog = async (event) => {
    event.preventDefault()
    //console.log('Like handler called')
    const blogId = event.target.value
    const blog = blogs.filter(blog => blog.id === blogId)
    //console.log('Liked', blog)
    try {
      const updated = await blogService.like({ blog, blogId })
      const updatedBlogs = blogs.map(b => b.id === updated.id ? updated : b)
      sortBlogs(updatedBlogs)
      setBlogs(updatedBlogs)
    } catch (exception) {
      props.notHandler('error', exception.response.data.error)
    }
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    const blogId = event.target.value
    const deletee = blogs.find(blog => blog.id === blogId)
    const titleOfDeleted = `${deletee.title} by ${deletee.author}`
    console.log('Deleting blog ', titleOfDeleted)
    try {
      await blogService.remove({ blogId })
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      props.notHandler('success', `The blog ${titleOfDeleted} was deleted`)
    } catch (exception) {
      props.notHandler('error', exception.response.data.error)
    }
  }

  const blogList = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={likeBlog}
            deleteHandler={deleteBlog}
            showRemove={blog.user && props.userId === blog.user.id} />
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