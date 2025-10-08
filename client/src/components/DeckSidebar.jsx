import CreateDeck from '../components/CreateDeck'

/* accepts fetched decks from DashboardLayout.jsx */
export default function DeckSidebar({ decks, setSelectedDeckId }){

    return(
        <div>
            <p>Deck list</p>
            { decks && decks.map((deck, i) => (
                <p 
                    key={i}
                    onClick={() => setSelectedDeckId(deck._id)}
                >
                    {deck.name}</p>
            ))}

            <CreateDeck />
        </div>
    )
}