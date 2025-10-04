import { useEffect, useState } from "react"
import {getWordsApi} from "../api/api"
import { createCardApi } from "../api/cardApi"
import CreateDeck from "../components/CreateDeck"

export default function CreateCard() {

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
            const responseData = await createCardApi(cardId)
            console.log("responseData:", responseData)
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <div>
        <CreateDeck />
        <h3>Gonna create a card here</h3>

        <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />

        { searchResults.length > 0 && (
            searchResults.map(result => (
            <div 
                key={result._id}
                onClick={() => addCardToDeck(result._id)}
            >
            { result.translations[0].POS === 'NOUN' && (
                <span>{result.translations[0].article} </span>
                ) }
                <span>{result.sp_word} </span>
                <span>{result.translations[0].POS.toLowerCase()}: </span>
                <span>{result.translations[0].en_word.toLowerCase()}</span>
            </div>
        ))
      )}

      </div>
    )
}