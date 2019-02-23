
import axios from 'axios'
const baseUrl = '/api/blogs'

let user = null
let token = null

const setUser = newUser => {
  user = newUser
  setToken(user.token)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  newObject.user = user.id
  const response = await axios.post(baseUrl, newObject, config)
  response.data.user = {'username': user.username, 'name': user.name, 'id': user.id}
  return response.data
}

const like = async ( props ) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl.concat(`/${props.blogId}`), props.blog, config)
  return response.data
}

export default { getAll, create, setUser, setToken, like }