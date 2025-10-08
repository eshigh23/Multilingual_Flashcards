import { useEffect, useState } from 'react'
import CreateCard from '../components/CreateCard'
import CreateDeck from '../components/CreateDeck'
import { createDeckApi, fetchDecksApi } from '../api/deckApi'
import { fetchDueCardsFromDeckApi } from '../api/cardApi'
import Card from '../components/Card'


// takes deck info as parameter
// displays cards to be reviewed, or creates cards for deck?, 
// see all cards in the deck, deck settings, etc...
export default function DeckPage(){
    const [decks, setDecks] = useState([])
    const [deckId, setDeckId] = useState(null)
    const [cards, setCards] = useState([])

    useEffect(() => {
        console.log("decks:", decks)
    }, [decks])

    // fetch all decks for a user
    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const responseData = await fetchDecksApi()
                setDecks(responseData.decks ? responseData.decks: [])

            } catch (e) {
                console.error(e)
            }
        }
        fetchDecks()
    }, [])

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
            <h3>Deck list</h3>
            { decks && decks.map((deck, i) => (
                <p 
                    key={i}
                    onClick={() => setDeckId(deck._id)}
                >
                    {deck.name}</p>
            ))}
            <CreateDeck />
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