
import './CreateDeckPage.css'
import CreateDeck from "../components/CreateDeckForm"
import { useOutletContext } from "react-router-dom"
import { CreditCard, FolderPlus } from 'lucide-react'

export default function CreateDeckPage() {
    const { decks, setDecks } = useOutletContext()

    return (
        <div className="createdeckpage">
            <div className="icon-title">
                <FolderPlus color="black" size={30} />
                <p className="deck--name">Create deck</p>
            </div>
            <CreateDeck
                decks={decks}
                setDecks={setDecks} 
            />
        </div>
    )
}