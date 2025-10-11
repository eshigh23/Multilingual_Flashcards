const Entry = require('../models/DictionaryEntry.js')
const User = require('../models/User.js')
const Card = require('../models/Card.js')
const Deck = require('../models/Deck.js')

/*
    word: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User',  required: true },
    deck: { type: Schema.Types.ObjectId, ref: 'Deck', // required: true },

    // study stats based on spaced repetition SM2 algorithm
    easinessFactor: { type: Number, default: 2.5 },
    repetitions: { type: Number, default: 0 },
    interval: { type: Number, default: 1},
    nextReview: { type: Date }
}, { timestamps: true })
*/

exports.createCard = async (req, res) => {
    const user = req.user
    const { cardId, deckId } = req.body
    console.log("user:", user, "cardId:", cardId, "deckId:", deckId)

    try {
        // validate user in db
        const _user = await User.findById(user.id)
        if (!_user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // validate card in db
        const entry = await Entry.findById(cardId)
        if (!entry) {
            return res.status(404).json({ message: 'Word not found' })
        }

        // @todo: validate deck in db

        // @todo: validate dictionaryentry in db

        const card = await Card.create({
            user: _user._id,
            word: entry._id,
            deck: deckId,
            nextReview: new Date()
        })

        return res.status(201).json({ message: 'new card created', card})


    } catch (e) {
        console.error(e)
        return res.status(400).send()
    }
}

exports.fetchDueCardsFromDeck = async (req, res) => {
    try {
        const _user = req.user
        console.log("user:", _user)
        const { deckId } = req.params
        console.log("deckId:", deckId)

        const user = await User.findById(_user.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const now = new Date()

        const deck = await Deck.findById(deckId)
        // @todo check here that deck exists

        // fetch all cards for a deck less than or equal to new date
        const cards = await Card.find({ 
            deck: deckId,
            nextReview: { $lte: now }

        }).populate('word')
        return res.status(200).json({ deck, cards })

    } catch (e) {
        console.error(e)
        return res.status(400).send()
    }
}

exports.updateCard = async (req, res) => {
    try {
        const { cardId, difficulty } = req.body

        const card = await Card.findById(cardId)
        if(!card) {
            return res.status(404).json({ message: 'Card not found'})
        }

        const updatedCard = calculatedSpacedRepetition(card, difficulty)
        await card.save()

        return res.status(200).json({ updatedCard })

    } catch (e) {
        console.error(e)
        return res.status(400).send()
    }
}


const calculatedSpacedRepetition = (card, difficulty) => {
    const difficultyMap = { 'forgot': 0, 'hard': 1.5, 'okay': 3, 'easy': 4.5 }
    const q = difficultyMap[difficulty]

    // calculate new EF, clamp to minimum 1.3
    console.log("old easiness factor:", card.easinessFactor)
    card.easinessFactor = card.easinessFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    if (card.easinessFactor < 1.3) card.easinessFactor = 1.3

    if (q === 0) {
        card.repetitions = 0     // 0 successful repetitions
        card.interval = 0    // reset interval
    } else {
        card.repetitions += 1
        if (card.repetitions === 1) {   // if first time reviewing card or card failed
            card.interval = 1   // set interval to 1
        }
        else {
            card.interval = Math.round(card.interval * card.easinessFactor)
        }
    }

    card.nextReview = new Date(Date.now() + card.interval * 24*60*60*1000)

    return card;
}
