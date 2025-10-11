import './DashboardLayout.css'
import { useEffect, useState } from 'react'
import DeckSidebar from './DeckSidebar';
import MainSection from './MainSection';
import DeckPage from '../pages/DeckPage';
import Navbar from './Navbar';
import { fetchDecksApi } from '../api/deckApi';


export default function DashboardLayout() {
    const [decks, setDecks] = useState([]);
    const [selectedDeckId, setSelectedDeckId] = useState(null);

    useEffect(() => {
        console.log('deck:', decks)
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

    return (
        <div className="dashboard-layout">
            <Navbar />
            <DeckSidebar
                decks={decks}
                setSelectedDeckId={setSelectedDeckId}
            />
            <MainSection
                deckId={selectedDeckId} 
            />
        </div>
    )
}