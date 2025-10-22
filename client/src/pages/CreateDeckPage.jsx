
import CreateDeck from "../components/CreateDeck"
import { useOutletContext } from "react-router-dom"

export default function CreateDeckPage() {
    const { decks, setDecks } = useOutletContext()

    return (
        <div>
            <p>Create deck</p>
            <CreateDeck
                decks={decks}
                setDecks={setDecks} 
            />
        </div>
    )
}