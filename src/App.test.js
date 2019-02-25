import React from 'react'
import { render,  waitForElement } from 'react-testing-library'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {

  it('Blogs are not rendered when user is not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('Log in to application')
    )

    expect(component.container).not.toHaveTextContent('Canonical string reduction')
    expect(component.container).not.toHaveTextContent('First class tests')
    expect(component.container).not.toHaveTextContent('TDD harms architecture')
    expect(component.container).not.toHaveTextContent('Type wars')

  })

  it('Blogs are rendered when user is logged in', async () => {
    const user = {
      username: 'testeur',
      name: 'Louis Testeur',
      token: 'BrokenTokenHoboken'
    }

    localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText(`${user.name} logged in`))

    expect(component.container).toHaveTextContent('Canonical string reduction')
    expect(component.container).toHaveTextContent('First class tests')
    expect(component.container).toHaveTextContent('TDD harms architecture')
    expect(component.container).toHaveTextContent('Type wars')


  })

})