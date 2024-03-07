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

const getById = async ({ id }) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
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
    const id = response.data.id
    const populatedResponse = await axios.get(`${baseUrl}/${id}`)
    return populatedResponse.data
  } catch (exception) {
    throw new Error(`${exception.response.status} ${JSON.stringify(exception.response.data)}`)
  }
}

const update = async ({ id, newObject }) => {
  try {
    await axios.put(`${baseUrl}/${id}`, newObject)
    const populatedResponse = await axios.get(`${baseUrl}/${id}`)
    return populatedResponse.data
  } catch (exception) {
    throw new Error(`${exception.response.status} ${JSON.stringify(exception.response.data)}`)
  }
}

const remove = async ({ id, token }) => {
  const config = {
    headers: { Authorization: `${formatBearerToken(token)}` },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (exception) {
    throw new Error(`${exception.response.status} ${JSON.stringify(exception.response.data)}`)
  }
}

export default { getAll, getById, create, update, remove }