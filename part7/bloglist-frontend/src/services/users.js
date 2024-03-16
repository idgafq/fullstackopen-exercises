import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (exception) {
    throw new Error(`${exception.response.status} ${JSON.stringify(exception.response.data)}`)
  }
}

export default { getAll }