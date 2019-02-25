const blogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 32,
    user: {
      username: 'tester',
      name: 'Testing User',
      id: '5c66666986a70e822fb6a580'
    },
    id: '5c665675920ff870c445cab6'
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 19,
    user: {
      username: 'tester',
      name: 'Testing User',
      id: '5c66666986a70e822fb6a580'
    },
    id: '5c66567c920ff870c445cab7'
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 18,
    user: {
      username: 'tester',
      name: 'Testing User',
      id: '5c66666986a70e822fb6a580'
    },
    id: '5c665682920ff870c445cab8'
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 17,
    user: {
      username: 'tester',
      name: 'Testing User',
      id: '5c66666986a70e822fb6a580'
    },
    id: '5c66568d920ff870c445cab9'
  }

]

const setUser = (user) => {
  return
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { setUser, getAll }