import axios from 'axios'
const { base_HTML } = require('../utils/config')
const baseUrl = base_HTML + '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl} /${id}`, newObject)
  return request.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(baseUrl + '/' + id, config) //(`${baseUrl} /${id}`, config)
  return response.data
}

const exportedObj = {
  getAll,
  setToken,
  create,
  update,
  deleteBlog
}

export default exportedObj