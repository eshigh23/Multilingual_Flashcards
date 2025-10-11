import './CreateCard.css'
import { useEffect, useState } from "react"
import {getWordsApi} from "../api/api"
import { createCardApi } from "../api/cardApi"
import CreateDeck from "../components/CreateDeck"

export default function CreateCard({ deckId, addCard }) {

    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const getWords = async () => {
        try {
            const responseData = await getWordsApi(searchText)
            console.log("responseData:", responseData)
            setSearchResults(responseData.entries)

        } catch (e) {
            console.error(e)
        }
        }
        if (searchText){
            getWords()
        } else {
            setSearchResults([])
        }
  }, [searchText])


    const addCardToDeck = async (cardId) => {
        try {
            const responseData = await createCardApi({ cardId, deckId })
            console.log("responseDataaaaaaa:", responseData)
            addCard(responseData.card)
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <div className='createcard'>
            
            <div className="createcard--flashcard-container">
                <p className="createcard--dictionary-text">Dictionary Search</p>

                <div className="createcard--flashcard">
                    <div className="createcard--input-wrapper">
                        <input
                            type="text"
                            placeholder="Enter a word..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div className="createcard--lang">
                            <p>SP</p>
                        </div>
                    </div>

                    { searchResults.length > 0 && (
                        <>
                        <div className="createcard--column-headers">
                            <span>Word</span>
                            <span>POS</span>
                            <span>Translation</span>
                        </div>
                        { searchResults.map(result => (
                            <div
                                className="createcard--result-wrapper"
                                key={result._id}
                                onClick={() => addCardToDeck(result._id)}
                            >
                                <p>{result.translations[0].article} {result.sp_word} </p>
                                <p>{result.translations[0].POS.toLowerCase()} </p>
                                <p>{result.translations[0].en_word.toLowerCase()}</p>
                            </div>
                        ))}
                        </>
                    )}
                    </div>
            </div>
      </div>
    )
}