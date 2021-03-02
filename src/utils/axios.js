import _axios from 'axios'

const axiosInstance = _axios.create()
const URL_API = 'http://127.0.0.1:3333'

axiosInstance.defaults.baseURL = URL_API
axiosInstance.defaults.withCredentials = true

export const axios = axiosInstance
