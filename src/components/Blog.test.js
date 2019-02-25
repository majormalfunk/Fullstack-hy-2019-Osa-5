import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('Blog tests', () => {

  const blog = {
    title: 'Last Blog on Earth',
    author: 'Nero Blogge',
    url: 'http://localhost:666',
    likes: 13
  }

  const mockHandler = jest.fn()


  test('Initially only title and author are shown', () => {

    const component = render(
      <Blog
        blog={blog}
        likeHandler={mockHandler}
        deleteHandler={mockHandler}
        showRemove={false} />
    )
    expect(component.container).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    )

    expect(component.container).not.toHaveTextContent(
      `${blog.url}`
    )
    expect(component.container).not.toHaveTextContent(
      `${blog.likes} likes`
    )

  })

  test('Clicking the title calls opens the details', async () => {

    const component = render(
      <Blog
        blog={blog}
        likeHandler={mockHandler}
        deleteHandler={mockHandler}
        showRemove={false} />
    )
    const div = component.container.querySelector('.titleandauthor')
    fireEvent.click(div)
    expect(component.container).toHaveTextContent(
      `${blog.url}`
    )
    expect(component.container).toHaveTextContent(
      `${blog.likes} likes`
    )


  })

})


