import axios from 'axios'

const API_URL = 'http://localhost:5000'

export const getHelloApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/hello`)
        return response.data

    } catch (e) {
        throw e
    }
}

export const getWordsApi = async (searchQuery) => {
    try {
        const response = await axios.get(`${API_URL}/getWords/`, {
            params: { searchQuery } // query parameters
        })
        return response.data

    } catch (e) {
        throw e
    }
}