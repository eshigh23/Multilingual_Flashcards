import { useEffect, useState } from 'react'
import CreateCard from '../components/CreateCard'

import { createDeckApi, fetchDecksApi } from '../api/deckApi'
import { fetchDueCardsFromDeckApi } from '../api/cardApi'
import Card from '../components/Card'


// takes deck info as parameter
// displays cards to be reviewed, or creates cards for deck?, 
// see all cards in the deck, deck settings, etc...
export default function DeckPage({ deckId }){

    const [cards, setCards] = useState([])


    // default behavior: fetch all cards that are due for review
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const responseData = await fetchDueCardsFromDeckApi(deckId)
                setCards(responseData.cards ? responseData.cards : [])
                console.log("cards:", responseData.cards)
            } catch (e) {
                console.error(e)
            }
        }
        if (deckId) fetchCards()

    }, [deckId])

    return(
        <div>
            <h2>Deck page</h2>
            { deckId && (
                <CreateCard
                    deckId={deckId} 
                />
            )}

            { cards.map((card) => (
                <Card key={card._id} card={card} />
            ))}

        </div>
    )
}