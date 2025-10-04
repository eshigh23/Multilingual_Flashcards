import { useEffect, useState } from 'react'
import { createDeckApi } from '../api/deckApi'

export default function CreateDeck() {
    
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
            console.log("responseData:", responseData)

        } catch (e) {
            console.error(e)
        }
    }


    return(
        <div>
            <h3> Creating le deck </h3>
            <button onClick={() => setIsCreate(true)}> Create new deck </button>
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