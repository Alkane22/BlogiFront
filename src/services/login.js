import axios from 'axios'
const { base_HTML } = require('../utils/config')
const baseUrl = base_HTML + '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const exportedObj = {
  login
}
export default exportedObj