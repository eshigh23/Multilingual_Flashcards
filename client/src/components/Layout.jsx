import './Layout.css'
import { useEffect, useState } from 'react'
import DeckSidebar from './DeckSidebar';
import { fetchDecksApi } from '../api/deckApi';
import { Outlet } from 'react-router-dom';


export default function Layout() {
    const [decks, setDecks] = useState([])

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

            <aside className="decksidebar--wrapper">
                <DeckSidebar
                    decks={decks} 
                />
            </aside>


            <main className="main">
                <Outlet context={{ decks, setDecks }} />
            </main>
        </div>
    )
}