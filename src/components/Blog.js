import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, notHandler }) => {
  const [likes, setLikes] = useState(blog.likes)

  const detailsRef = React.createRef()

  const handleLike = async (event) => {
    event.preventDefault()
    const blogId = blog.id
    console.log('Blog id', blogId)
    try {
      const updatedBlog = await blogService.like({ blog, blogId })
      blog.likes = updatedBlog.likes
      setLikes(blog.likes)
    } catch (exception) {
      notHandler('error', exception.response.data.error)
    }
  }

  const BlogTitle = () => {
    return (
      <div>{blog.title} by {blog.author}</div>
    )
  }

  const AddedBy = () => {
    if (blog.hasOwnProperty('user')) {
      return (
        <td>Added by {blog.user.name}</td>
      )
    } else {
      return <td>&nbsp;</td>
    }
  }

  return (
    <div width="80%">
      <Togglable showCollapsed={BlogTitle()} shownStyle="detailsshown" ref={detailsRef} >
        <div>{blog.title} by {blog.author}</div>
        <table>
          <tbody>
            <tr>
              <td><a href={blog.url}>{blog.url}</a></td>
            </tr>
            <tr>
              <td>{likes} likes <button type="button" onClick={handleLike}>Like</button></td>
            </tr>
            <tr>
              {AddedBy()}
            </tr>
          </tbody>
        </table>
      </Togglable >
    </div>
  )

}

export default Blog