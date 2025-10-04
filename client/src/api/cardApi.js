import axios from 'axios'

const API_URL = 'http://localhost:5000/card'

export const createCardApi = async (cardId) => {
    try {
        const response = await axios.post(`${API_URL}/createCard`, { cardId }, {
            withCredentials: true
        })
        return response.data

    } catch (e) {
        throw e
    }
}

export const fetchCardsFromDeckApi = async (deckId) => {
    try {
        const response = await axios.get(`${API_URL}/${deckId}/cards`, {
            withCredentials: true
        })
        return response.data

    } catch (e) {
        throw e
    }
}