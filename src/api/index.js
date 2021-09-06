import {axios, setToken, clearToken} from '@/api/axios'
import {websocket} from '@/api/socket'

const getList = async () => {
    let res

    try {
        res = await axios.post('/list')
    } catch (error) {
        console.error(error)
        return {}
    }

    return res?.data || {}
}

const checkAuth = async () => {
    let res

    try {
        res = await axios.post('/check')
    } catch (error) {
        console.error(error)
        return {}
    }

    return res?.data || {}
}

const login = async ({email, password}) => {
    let answer

    try {
        const res = await axios.post('/login', {email, password})

        answer = res?.data || {}

        let {success, user} = answer

        if ( success && user.token ) {
            setToken(user.token)
        }
    } catch (error) {
        console.error(error)
        return {}
    }

    return answer
}

const register = async ({email, password, passwordConfirm}) => {
    let answer

    try {
        const res = await axios.post('/register', {email, password, passwordConfirm})

        answer = res?.data || {}
        let {success, user, errorMessage} = answer

        if (success && user.token) {
            setToken(user.token)
        }
    } catch (error) {
        console.error(error)
        return {}
    }

    return answer
}


const logout = async () => {
    try {
        await axios.post('/logout')
    } catch (error) {
        console.error(error)
        return
    }

    websocket.close()
    clearToken()
}

export default {
    getList,
    checkAuth,
    login,
    register,
    logout,
}
