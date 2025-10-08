import { useEffect, useState } from 'react'
import { updateCardApi } from '../api/cardApi'

export default function Card({ card }) {
    const [isFront, setIsFront] = useState(true)

    const updateCard = async (e, difficulty) => {
        e.stopPropagation()
        try {
            const responseData = await updateCardApi(card._id, difficulty)
            console.log("updated card:", responseData.updatedCard)

        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div onClick={() => setIsFront(prev => !prev)}>
            <h3>Card</h3>

            { isFront ? (
                <h3>{card.word.sp_word}</h3>
            ) : (
                <h3>{card.word.translations[0].en_word}</h3>
            )}

            <button onClick={(e)=> updateCard(e, 'forgot')}>Forgot</button>
            <button onClick={(e)=> updateCard(e, 'hard')}>Hard</button>
            <button onClick={(e)=> updateCard(e, 'okay')}>Okay</button>
            <button onClick={(e)=> updateCard(e, 'easy')}>Easy</button>
        </div>
    )
}