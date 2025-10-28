import './DeckPage.css'
import { useEffect, useState } from 'react'
import CreateCard from '../components/CreateCard'

import { createDeckApi, fetchDecksApi } from '../api/deckApi'
import { fetchDueCardsFromDeckApi } from '../api/cardApi'
import Card from '../components/Card'
import { BookOpen, CirclePause, CirclePlus, Layers, Settings } from 'lucide-react'
import { useParams } from 'react-router-dom'



// takes deck info as parameter
// displays cards to be reviewed, or creates cards for deck?, 
// see all cards in the deck, deck settings, etc...
export default function DeckPage(){
    const { deckId } = useParams()

    const [deck, setDeck] = useState(null)
    const [deckLength, setDeckLength] = useState(null)
    const [cards, setCards] = useState([])
    const [numDue, setNumDue] = useState(cards?.length || null)
    const [selectedMode, setSelectedMode] = useState("study")
    const [isProgressBar, setIsProgressBar] = useState(true)


    // default behavior: fetch all cards that are due for review
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const responseData = await fetchDueCardsFromDeckApi(deckId)
                setCards(responseData.cards ? responseData.cards : [])
                setDeck(responseData.deck ? responseData.deck : null)
                setDeckLength(responseData.deckLength)
                setNumDue(responseData.numDue ? responseData.numDue : null)
                console.log("cards:", responseData.cards)
                console.log("deck", responseData.deck)
                console.log("num due:", responseData.numDue)
            } catch (e) {
                console.error(e)
            }
        }
        if (deckId) fetchCards()

    }, [deckId])

    const popStudiedCardFromDeck = (cardId) => {
        console.log("popping card optimistically...")
        setCards(prevCards => prevCards.filter(card => card._id !== cardId))
    }

    const addNewCardToDeck = (card) => {
        console.log("adding card optimistically...", card)
        setCards(prevCards => [...prevCards, card])
    }

    useEffect(() => {
        console.log("new cards:", cards)
    }, [cards])

    useEffect(() => {
        console.log("deck:", deck)
    }, [deck])

    return(
        <div className="deck">
            { deck && deckId && (
            <>
            <div className="deck--header">
                <div className="deck--preheaders">
                    <div className="deck--preheader">
                        <Layers size={20} color={'#7C7C7C'} />
                        <p>{deckLength} card{deckLength === 1 ? '' : 's'} </p>
                    </div>
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
                    <div className="deck--button-container">
                        <div 
                            className={`deck--button ${selectedMode === 'study' ? 'active' : ''}`}
                            onClick={() => setSelectedMode('study')}
                        >
                                <BookOpen color="black"/>
                                <p>Study { numDue && `(${numDue})` }</p>
                        </div>
                        <div className={`deck--underline ${selectedMode==='study' ? 'active' : ''}`}></div>
                    </div>
              
                    <div className="deck--button-container">
                        <div 
                            className={`deck--button ${selectedMode === 'add' ? 'active' : ''}`}
                            onClick={() => setSelectedMode('add')}
                        >
                            <CirclePlus color="black"/>
                            <p>Add words</p>
                        </div>
                        <div className={`deck--underline ${selectedMode==='add' ? 'active' : ''}`}></div>
                    </div>
                </div>
            </div>

            {/* <CreateCard deckId={deckId} /> */}
            { selectedMode === 'study' ? (

                cards.length > 0 ? (
                <div className="flashcard--container">
                        <Card 
                            key={cards[0]?._id} 
                            card={cards[0]} 
                            popCard={popStudiedCardFromDeck}
                        />
                        {numDue && isProgressBar ? (
                            <>
                                <div className="deck--progressbar">
                                    <div 
                                        className="deck--progressbar-fill"
                                        style={{ width: `${numDue > 0 ? ((numDue - cards.length) / numDue) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <div className="deck--progressbar-options">
                                    <p className="deck--num-due">{numDue - cards.length}/ {numDue} studied</p>
                                    <p 
                                        className="deck--hide-progress"
                                        onClick={() => setIsProgressBar(false)}>Hide progress bar</p>
                                </div>
                            </>
                        ) : (
                            <div className="deck--progressbar-options">
                                <p></p>
                                <p 
                                    className="deck--hide-progress"
                                    onClick={() => setIsProgressBar(true)}> Show progress bar
                                </p>
                            </div>
                        )}

                </div>
                ): (
                    <p>You're all caught up!</p>
                )
                
            ) : (
                <div className="deck--create-card">
                    <CreateCard 
                        deckId={deckId}
                        addCard={addNewCardToDeck}
                        setCards={setCards}
                        setDeck={setDeck}
                        setNumDue={setNumDue}
                    />
                </div>
                
            )}

            </>
            )}
        </div>
        );


}