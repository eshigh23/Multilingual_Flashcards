import './DeckSidebar.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchDecksApi } from '../api/deckApi'



/* accepts fetched decks from DashboardLayout.jsx */
export default function DeckSidebar({ decks }){
    const navigate = useNavigate()

    const navigateToDeck = (deckId) => {
        navigate(`/deck/${deckId}`)
    }

    const navigateToCreate = () => {
        navigate('/deck/create')
    }

    useEffect(() => {
        console.log('deck:', decks)
    }, [decks])


    return(
        <div className="decksidebar">
            <div className="sidebar--container">
                <div className="sidebar--decks-container">
                    <p className="sidebar--header">My Decks</p>

                    { decks && decks.map((deck, i) => (
                        <p
                            className="sidebar--deckname" 
                            key={i}
                            onClick={() => navigateToDeck(deck._id)}
                        >
                            {deck.name}</p>
                    ))}
                </div>
                {/* button here that navigates to create deck page */}
                <button onClick={navigateToCreate}>Create deck</button>

            </div>
        </div>
    )
}