import axios from 'axios'

const API_URL = 'http://localhost:5000/card'

export const createCardApi = async (cardInfo) => {
    try {
        const response = await axios.post(`${API_URL}/createCard`, cardInfo, {
            withCredentials: true
        })
        return response.data

    } catch (e) {
        throw e
    }
}

export const fetchDueCardsFromDeckApi = async (deckId) => {
    try {
        const response = await axios.get(`${API_URL}/fetchCards/${deckId}`, {
            withCredentials: true
        })
        return response.data

    } catch (e) {
        throw e
    }
}

export const updateCardApi = async (cardId, difficulty) => {
    try {
        const response = await axios.put(`${API_URL}/updateCard`, {cardId, difficulty},  {
            withCredentials: true
        })
        return response.data
        
    } catch (e) {
        throw e
    }
}