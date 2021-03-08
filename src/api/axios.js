import _axios from 'axios'

const axiosInstance = _axios.create()
const env = require(`../../env/${ process.env.NODE_ENV }.env`)

axiosInstance.defaults.baseURL = env.API_URL
axiosInstance.defaults.withCredentials = true

export const axios = axiosInstance

export const getToken = function() {
    return localToken
}

export const setToken = function(token) {
    if ( localToken !== token ) {
        localToken = token
        window.localStorage.setItem('token', token)
    }

    axiosInstance.defaults.headers.common = {'Authorization': `bearer ${token}`}
}

export const clearToken = function() {
    delete axiosInstance.defaults.headers.common['Authorization']
    delete window.localStorage.removeItem('token')
}

let localToken = window.localStorage.getItem('token')
localToken && setToken(localToken);
