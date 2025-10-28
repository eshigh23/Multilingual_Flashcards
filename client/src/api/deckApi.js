
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

export const deleteDeckApi = async (deckId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${deckId}`, {
            withCredentials: true
        })
        return response.data
        
    } catch (e) {
        throw e;
    }
}

export const fetchDecksApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/fetchDecks`, {
            withCredentials: true
        })
        return response.data    // contains

    } catch (e) {
        throw e
    }
}

