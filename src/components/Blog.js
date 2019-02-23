import React from 'react'
import Togglable from './Togglable'
import blogs from '../services/blogs';


const Blog = ({ blog }) => {

  const toggRef = React.createRef()

  const BlogTitle = () => {
    return (
      <tr>
        <td>{blog.title} by {blog.author}</td>
      </tr>
    )
  }

  const AddedBy = () => {
    if (blog.user) {
      return (
        <tr>
          <td>Added by {blogs.user.name}</td>
        </tr>

      )
    }
  }

  return (

    < Togglable showAlways={BlogTitle()} shownStyle="detailsshown" ref={toggRef} >
      <tr>
        <td><a href={blog.url}>{blog.url}</a></td>
      </tr>
      <tr>
        <td>{blog.likes} likes <button type="submit">Like</button></td>
      </tr>
      {AddedBy()}
    </Togglable >

  )

}

export default Blog