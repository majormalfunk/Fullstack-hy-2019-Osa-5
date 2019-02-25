import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, deleteHandler, showRemove }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [showDetails, setShowDetails] = useState('detailshidden')

  const toggleVisibility = () => {
    setShowDetails(showDetails === 'detailshidden' ? 'detailsshown' : 'detailshidden')
  }

  const handleLike = async (event) => {
    setLikes(blog.likes + 1)
    likeHandler(event)
  }

  const handleRemove = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteHandler(event)
    }
  }

  const BlogTitle = () => {
    return <div>{blog.title} by {blog.author}</div>
  }

  const AddedBy = () => {
    if (blog.hasOwnProperty('user')) {
      return <td>Added by {blog.user.name}</td>
    } else {
      return <td>&nbsp;</td>
    }
  }

  const RemoveButton = () => {
    if (showRemove) {
      return <td><button value={blog.id} type="button" onClick={handleRemove}>Remove</button></td>
    } else {
      return <td>&nbsp;</td>
    }
  }

  const BlogDetails = () => {
    return (
      <table id={showDetails}>
        <tbody>
          <tr>
            <td><a href={blog.url}>{blog.url}</a></td>
          </tr>
          <tr>
            <td>{likes} likes <button value={blog.id} type="button" onClick={handleLike}>Like</button></td>
          </tr>
          <tr>
            {AddedBy()}
          </tr>
          <tr>
            {RemoveButton()}
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <div width="80%">
      <div>
        <div id="detailsshown">
          <div onClick={toggleVisibility} className="titleandauthor">{BlogTitle()}</div>
          {showDetails === 'detailsshown' ? BlogDetails() : null}
        </div>
      </div>
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  showRemove: PropTypes.bool.isRequired
}

export default Blog