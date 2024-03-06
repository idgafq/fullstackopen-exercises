import axios from 'axios'
const baseUrl = '/api/blogs'

const formatBearerToken = (token) => {
  return`Bearer ${token}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (exception) {
    throw new Error(`${exception.response.status} ${JSON.stringify(exception.response.data)}`)
  }
}

const create = async ({ newObject, token }) => {
  const config = {
    headers: { Authorization: `${formatBearerToken(token)}` },
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (exception) {
    throw new Error(`${exception.response.status} ${JSON.stringify(exception.response.data)}`)
  }
}

export default { getAll, create }