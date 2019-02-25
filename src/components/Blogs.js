import React, { useState, useEffect } from 'react'
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = ({ notHandler, userId }) => {

  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newURL = useField('text')

  const [blogs, setBlogs] = useState([])
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

  const handleShowForm = (event) => {
    setShowForm(!showForm)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle.params.value,
      author: newAuthor.params.value,
      url: newURL.params.value
    }

    try {
      const created = await blogService.create(blogObject)
      console.log('Created blog', created)
      setBlogs(blogs.concat(created))
      newTitle.reset()
      newAuthor.reset()
      newURL.reset()
      notHandler('success', `A new blog ${created.title} was added`)
    } catch (error) {
      console.log(error.response.data.error)
      notHandler('error', error.response.data.error)
    }
  }

  const likeBlog = async (event) => {
    event.preventDefault()
    const blogId = event.target.value
    const blog = blogs.filter(blog => blog.id === blogId)
    try {
      const updated = await blogService.update({ blog, blogId })
      blog[0].likes = updated.likes
      const updatedBlogs = blogs.map(b => b.id === blog[0].id ? blog[0] : b)
      sortBlogs(updatedBlogs)
      setBlogs(updatedBlogs)
    } catch (exception) {
      notHandler('error', exception.response.data.error)
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
      notHandler('success', `The blog ${titleOfDeleted} was deleted`)
    } catch (exception) {
      notHandler('error', exception.response.data.error)
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
            showRemove={!blog.user || blog.user.id !== userId ? false : true} />
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
                <td><input size="70" {...newTitle.params} /></td>
              </tr>
              <tr>
                <td>Author:</td>
                <td><input size="70" {...newAuthor.params} /></td>
              </tr>
              <tr>
                <td>URL:</td>
                <td><input size="70" {...newURL.params} /></td>
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

Blogs.propTypes = {
  notHandler: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

export default Blogs