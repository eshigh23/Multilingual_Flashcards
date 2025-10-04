import { useEffect, useState } from 'react'
import CreateCard from '../components/CreateCard'

// takes deck info as parameter
// displays cards to be reviewed, or creates cards for deck?, 
// see all cards in the deck, deck settings, etc...
export default function DeckPage(){

    // default behavior: fetch all cards that are due for review
    useEffect(() => {
        try {

        } catch (e) {
            console.error(e)
        }
    })

    return(
        <div>
            <h1>Deck page</h1>
            <CreateCard 
            />
        </div>
    )
}