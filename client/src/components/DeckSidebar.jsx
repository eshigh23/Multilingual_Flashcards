import './DeckSidebar.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Folders } from 'lucide-react'
import { deleteDeckApi } from '../api/deckApi'
import { Trash } from 'lucide-react'



/* accepts fetched decks from DashboardLayout.jsx */
export default function DeckSidebar({ decks, setDecks }){
    const navigate = useNavigate()

    // @todo: eventually move to deck settings
    const deleteDeck = async (deckId) => {
        try {
            const responseData = await deleteDeckApi(deckId)
            setDecks(responseData.updatedDecks)
        } catch (e) {
            console.error(e)
        }
    }

    const navigateToDeck = (deckId) => {
        navigate(`/deck/${deckId}`)
    }

    const navigateToCreate = () => {
        navigate('/deck/create')
    }

    useEffect(() => {
        console.log('decks:', decks)
    }, [decks])


    return(
        <div className="decksidebar">
            <div className="sidebar--container">
                <div className="sidebar--decks-container">
                    <div className="icon-title">
                        <Folders color="black" size={24} />
                        <p className="sidebar--header">My Decks</p>
                    </div>


                    { decks && decks.map((deck, i) => (
                        <div className="sidebar--deck-info" key={i}>
                            <p
                                className="sidebar--deckname" 
                                onClick={() => navigateToDeck(deck._id)}
                            >
                                {deck.name}
                            </p>
                            <div className="sidebar--numdue-trash">
                                <p>{deck.cardsDueToday} due</p>
                                <Trash
                                    className="icon" 
                                    size={15}
                                    onClick={() => deleteDeck(deck._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {/* button here that navigates to create deck page */}
                <button onClick={navigateToCreate}>Create deck</button>

            </div>
        </div>
    )
}