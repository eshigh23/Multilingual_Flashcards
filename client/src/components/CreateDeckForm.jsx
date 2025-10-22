import './CreateDeckForm.css'
import { useEffect, useState } from 'react'
import { createDeckApi } from '../api/deckApi'


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
        <div className="formWrapper">
        <form className="createdeckform" onSubmit={createDeck}>
                <label className="authLabel"> Name your deck:
                    <input
                        className="authInput"
                        type="text"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                    />
                </label>
                <label className="authLabel"> Select deck language:
                    <select
                        className="authInput"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                        <option value="spanish">Spanish</option>
                    </select>
                </label>
                <button className="authButton">Create</button>
        </form>
        </div>
    )
}