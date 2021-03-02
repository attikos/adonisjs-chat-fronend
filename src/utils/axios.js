import _axios from 'axios'

// const isDev = process.env.NODE_ENV === 'development'
const axiosInstance = _axios.create()
const env = require(`../../env/${ process.env.NODE_ENV }.env`)

axiosInstance.defaults.baseURL = env.API_URL
axiosInstance.defaults.withCredentials = true

export const axios = axiosInstance
