import './Card.css'
import { useEffect, useState } from 'react'
import { updateCardApi } from '../api/cardApi'
import CardButton from './CardButton'

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
        <div
            className="flashcard"
            onClick={() => setIsFront(prev => !prev)}>

            { isFront ? (
                <div className="flashcard--content">
                    <p className="flashcard--word">{card.word.sp_word}</p>
                </div>
            ) : (
                <div className="flashcard--content">
                    <p className="flashcard--word">{card.word.translations[0].en_word}</p>
                </div>
            )}
            <div className="flashcard--buttons">
                <CardButton color='red' onClick={(e)=> updateCard(e, 'forgot')}>Forgot</CardButton>
                <CardButton color='orange' onClick={(e)=> updateCard(e, 'hard')}>Hard</CardButton>
                <CardButton color='green' onClick={(e)=> updateCard(e, 'okay')}>Okay</CardButton>
                <CardButton color='blue' onClick={(e)=> updateCard(e, 'easy')}>Easy</CardButton>
            </div>
        </div>
    )
}