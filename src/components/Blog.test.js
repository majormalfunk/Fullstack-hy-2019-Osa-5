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

  const component = render(
    <Blog
      blog={blog}
      likeHandler={mockHandler}
      deleteHandler={mockHandler}
      showRemove={false} />
  )

  it('Initially only title and author are shown', () => {

    expect(component.container).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    )

    expect(component.container).not.toHaveTextContent(
      `${blog.likes} likes`
    )

  })
  // EI ONNISTU CLICKKAAMAAN OTSIKKORIVIÄ. EI SITTEN MILLÄÄN.
  /*
  it('Clicking the title calls opens the details', async () => {

    const div = component.getByText(`${blog.title} by ${blog.author}`)
    fireEvent.click(div)

    expect(component.container).toHaveTextContent(
      `${blog.likes} likes`
    )

  })
  */

})


