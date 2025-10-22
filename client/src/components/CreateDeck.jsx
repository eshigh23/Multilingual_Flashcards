import './CreateDeck.css'
import { useEffect, useState } from 'react'
import { createDeckApi } from '../api/deckApi'
import { CirclePlus } from 'lucide-react'

export default function CreateDeck({ decks, setDecks }) {
    
    const [user, setUser] = useState(null)
    const [isCreate, setIsCreate] = useState(false)
    const [deckName, setDeckName] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('spanish')


    useEffect(() => {
        console.log("deck name:", deckName)
    }, [deckName])

    const createDeck = async (e) => {
        e.preventDefault()
        try {
            const responseData = await createDeckApi({ deckName, selectedLanguage })
            console.log("deck created!")
            console.log("responseData in createDeck:", responseData)
            // 
            setDecks(responseData.updatedDecks)

        } catch (e) {
            console.error(e)
        }
    }


    return(
        <div>
            <div 
                className="createdeck--new-button"
                onClick={() => setIsCreate(true)}
            > 
                    
                    <CirclePlus size={25} color={'black'}/> 
                    <p>Create new deck</p>
            </div>
            { isCreate && (
            
                <form onSubmit={createDeck}>
                    <label> Name your deck:
                        <input
                            type="text"
                            value={deckName}
                            onChange={(e) => setDeckName(e.target.value)}
                        />
                    </label>
                    <label> Select deck language:
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                            <option value="spanish">Spanish</option>
                        </select>
                    </label>
                    <button>Create</button>
                </form>
            )}
        </div>
    )
}