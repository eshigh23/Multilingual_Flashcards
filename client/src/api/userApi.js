import axios from 'axios'

const API_URL = 'http://localhost:5000/user'

export const createUserApi = async (userInfo) => {
    console.log("userInfo:", userInfo)
    try {
        const response = await axios.post(`${API_URL}/createUser`, userInfo, {
            withCredentials: true
        })
        return response.data

    } catch (e) {
        throw e
    }
}

export const fetchUserApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/fetchUser`, {
            withCredentials: true
        })
        return response.data

    } catch (e) {
        throw e
    }
}

export const loginUserApi = async (userInfo) => {
    try {
        const response = await axios.post(`${API_URL}/loginUser`, userInfo)
        return response.data

    } catch (e) {
        throw e
    }
}