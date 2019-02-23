import React from 'react'
const Blog = ({ blog }) => (
  <tr>
    <td>{blog.title}</td><td>{blog.author}</td><td><a href={blog.url}>{blog.url}</a></td>
  </tr>
)

export default Blog