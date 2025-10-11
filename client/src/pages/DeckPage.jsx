import './DeckPage.css'
import { useEffect, useState } from 'react'
import CreateCard from '../components/CreateCard'

import { createDeckApi, fetchDecksApi } from '../api/deckApi'
import { fetchDueCardsFromDeckApi } from '../api/cardApi'
import Card from '../components/Card'
import { CirclePause, Settings } from 'lucide-react'



// takes deck info as parameter
// displays cards to be reviewed, or creates cards for deck?, 
// see all cards in the deck, deck settings, etc...
export default function DeckPage({ deckId }){

    const [deck, setDeck] = useState(null)
    const [cards, setCards] = useState([])
    const [selectedMode, setSelectedMode] = useState("study")


    // default behavior: fetch all cards that are due for review
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const responseData = await fetchDueCardsFromDeckApi(deckId)
                setCards(responseData.cards ? responseData.cards : [])
                setDeck(responseData.deck ? responseData.deck : null)
                console.log("cards:", responseData.cards)
                console.log("deck", responseData.deck)
            } catch (e) {
                console.error(e)
            }
        }
        if (deckId) fetchCards()

    }, [deckId])

    return(
        <div className="deck">
            { deck && deckId && (
            <>
            <div className="deck--header">
                <div className="deck--preheaders">
                    <div className="deck--preheader" >
                        <CirclePause size={20} color={'#7C7C7C'} />
                        <p>Pause deck</p>
                    </div>
                    <div className="deck--preheader">
                        <Settings size={20} color={'#7C7C7C'} />
                        <p>Deck settings</p>
                    </div>
                </div>
                <p className="deck--name">{deck.name}</p>
                <div className="deck--buttons">
                    <p
                        className={selectedMode === 'study' ? 'active' : ''}
                        onClick={() => setSelectedMode('study')}>
                            Study
                    </p>
                    <p
                        className={selectedMode === 'add' ? 'active' : ''}
                        onClick={() => setSelectedMode('add')}
                    >
                        Add words
                    </p>
                </div>
            </div>

            {/* <CreateCard deckId={deckId} /> */}
            { selectedMode === 'study' ? (

                <div className="flashcard--container">

                        <Card key={cards[0]._id} card={cards[0]} />

                        <div className="deck--progressbar"></div>
                        <div className="deck--progressbar-options">
                            <p className="deck--num-due">0/ {cards.length} studied</p>
                            <p className="deck--hide-progress">Hide progress bar</p>
                        </div>
 
                </div>
                
            ) : (
                <div className="deck--create-card">
                    <p className="deck--dictionary-text">Dictionary Search</p>
                    <CreateCard deckId={deckId} />
                </div>
                
            )}

            </>
            )}
        </div>
        );


}