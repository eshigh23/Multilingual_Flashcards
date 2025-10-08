import './DashboardLayout.css'
import { useEffect, useState } from 'react'
import DeckSidebar from './DeckSidebar';
import DeckPage from '../pages/DeckPage';
import { fetchDecksApi } from '../api/deckApi';


export default function DashboardLayout() {
    const [decks, setDecks] = useState([]);
    const [selectedDeckId, setSelectedDeckId] = useState(null);

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

    return (
        <div className="dashboard-layout">
            <div>
                <p>Sidebar</p>
                <DeckSidebar
                    decks={decks}
                    setSelectedDeckId={setSelectedDeckId}
                />
            </div>
            <div>
                <p>page</p>
                { selectedDeckId ? (
                    <DeckPage
                        deckId={selectedDeckId} 
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}