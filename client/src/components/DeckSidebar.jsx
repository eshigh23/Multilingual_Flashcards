import './DeckSidebar.css'
import CreateDeck from '../components/CreateDeck'



/* accepts fetched decks from DashboardLayout.jsx */
export default function DeckSidebar({ decks, setSelectedDeckId }){

    return(
        <div className="decksidebar">
            <div className="sidebar--container">
                <div className="sidebar--decks-container">
                <p className="sidebar--header">My Decks</p>

                { decks && decks.map((deck, i) => (
                    <p
                        className="sidebar--deckname" 
                        key={i}
                        onClick={() => setSelectedDeckId(deck._id)}
                    >
                        {deck.name}</p>
                ))}
                </div>
                <CreateDeck />
            </div>
        </div>
    )
}