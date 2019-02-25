import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('Renders content', () => {

  const blog = {
    title: 'Blogging about blogging',
    author: 'Ernest Hemingblog',
    likes: 13
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.maintitle')
  expect(div).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  expect(component.container).toHaveTextContent(
    `blog has ${blog.likes} likes`
  )

})

test('Clicking the button twice calls the event handler twice', async () => {

  const blog = {
    title: 'Liking blogging',
    author: 'George Blogwell',
    likes: 1984
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})