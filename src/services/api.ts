import axios from 'axios'

import { AppError } from '../utils/AppError'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333'
})

api.interceptors.response.use(response => response, async error => {
  if (error.response?.data) {
    return await Promise.reject(new AppError(error.response.data.message))
  } else {
    return await Promise.reject(error)
  }
})

export { api }
