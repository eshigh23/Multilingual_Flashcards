import './Card.css'
import { useEffect, useState } from 'react'
import { updateCardApi } from '../api/cardApi'
import CardButton from './CardButton'

export default function Card({ card, popCard }) {
    const [isFront, setIsFront] = useState(true)

    const updateCard = async (e, difficulty) => {
        e.stopPropagation()
        try {
            const responseData = await updateCardApi(card._id, difficulty)
            console.log("updated card:", responseData.updatedCard)
            const updatedCard = responseData.updatedCard
            const now = new Date()
            if (now < new Date(updatedCard.nextReview)) {
                popCard(card._id)
            }
            // popCard(card._id)

        } catch (e) {
            console.error(e)
        }
    }

    const calculateNextReview = (difficulty) => {
        const difficultyMap = { 'forgot': 0, 'hard': 1, 'okay': 2.5, 'easy': 5 }
        const q = difficultyMap[difficulty]

        let repetitions = card.repetitions
        let interval = card.interval
        let easinessFactor = card.easinessFactor

        repetitions += 1
        // calculate new EF based on the user's 'difficulty' score 'q'
        easinessFactor += (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))

        // clamp easiness factor to 1.3 minimum
        if (easinessFactor < 1.3) easinessFactor = 1.3

        if (repetitions === 1) {
            if (q > 1.5) {
                interval = 1
            } else {
                interval = 0   // set interval to 0 if first  
                repetitions = 0
            }
        } else {
            interval = Math.round(card.interval * easinessFactor)
        }
        
        let nextReview = new Date(Date.now() + interval * 24*60*60*1000)
        console.log("next review:", nextReview)

        return interval
    }


    return (
        <div
            className="flashcard"
            onClick={() => setIsFront(prev => !prev)}>

            { isFront ? (
                <div className="flashcard--content">
                    <p className="flashcard--word">{card.word.translations[0].article} {card.word.sp_word}</p>
                </div>
            ) : (
                <div className="flashcard--content">
                    <p className="flashcard--word">{card.word.translations[0].en_word}</p>
                </div>
            )}
            <div className="flashcard--buttons">
                <CardButton color='red' onClick={(e)=> updateCard(e, 'forgot')}>
                    <p>Forgot</p>
                    <p className="flashcard--days">(0 days)</p>
                </CardButton>
                <CardButton color='orange' onClick={(e)=> updateCard(e, 'hard')}>
                    <p>Hard</p>
                    <p className="flashcard--days">({calculateNextReview('hard')} days)</p>
                </CardButton>
                <CardButton color='green' onClick={(e)=> updateCard(e, 'okay')}>
                    Okay
                    <p className="flashcard--days">({calculateNextReview('okay')} days)</p>
                </CardButton>
                <CardButton color='blue' onClick={(e)=> updateCard(e, 'easy')}>
                    Easy
                    <p className="flashcard--days">({calculateNextReview('easy')} days)</p>
                </CardButton>
            </div>
        </div>
    )
}