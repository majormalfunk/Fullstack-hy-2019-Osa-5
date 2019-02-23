import React from 'react'
import Togglable from './Togglable'


const Blog = ({ blog }) => {

  const detailsRef = React.createRef()

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
              <td>{blog.likes} likes <button type="submit">Like</button></td>
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