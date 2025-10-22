
import './MobileDecksList.css'
import { fetchDecksApi } from "../api/deckApi"
import { useAuth } from "../context/UserContext"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MobileDecksList({ onClose }) {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [decks, setDecks] = useState([])

    const navigateToDeck = (deckId) => {
        navigate(`deck/${deckId}`)

    }

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const responseData = await fetchDecksApi(user._id)
                setDecks(responseData.decks ? responseData.decks : ['hi'])
            } catch (e) {
                console.error(e)
            }
        }
        fetchDecks()
    }, [])

    return(
        <div className={`mobile-decks-list ${isVisible ? 'slide-in' : 'hidden'}`}>
            <p className="mobiledeckslist--my-decks">My decks</p>
            { decks && decks.map(deck => (
                <div 
                    key={deck._id}
                    className="mobiledeckslist--item"
                    onClick={() => {
                        navigateToDeck(deck._id)
                        onClose()
                    }}
                    
                >
                    <p >{deck.name}</p>
                </div>
            ))}
        </div>
    )

}