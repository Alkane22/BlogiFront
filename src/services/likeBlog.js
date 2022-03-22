import axios from 'axios'
const { base_HTML } = require('../utils/config')
const baseUrl = base_HTML + '/api/blogs'

const like = async (id) => {
  const response = await axios.put(baseUrl + '/' + id)
  return response.data
}

export default like