import './DeckSidebar.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Folder } from 'lucide-react'



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
                    <div className="icon-title">
                        <Folder color="black" size={24} />
                        <p className="sidebar--header">My Decks</p>
                    </div>


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