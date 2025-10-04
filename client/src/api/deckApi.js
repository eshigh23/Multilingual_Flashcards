
import axios from 'axios'

const API_URL = 'http://localhost:5000/deck'

export const createDeckApi = async (deckInfo) => {
    try {
        const response = await axios.post(`${API_URL}/create`, deckInfo, {
            withCredentials: true
        })
        return response.data

    } catch (e) {
        throw e
    }
}

