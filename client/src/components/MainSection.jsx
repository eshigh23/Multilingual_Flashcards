import './MainSection.css'
import DeckPage from "../pages/DeckPage"
import { useAuth } from "../context/UserContext"
import Welcome from './Welcome'

export default function MainSection({ deckId }){
    const { user } = useAuth()

    return (
        <div >
            { !deckId ? (
                <Welcome
                    user={user}
                />
            ) : (
                <DeckPage
                    deckId={deckId}
                    user={user} 
                />

            )}
        </div>
    )
}