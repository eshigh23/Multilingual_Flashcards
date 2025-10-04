const Entry = require('../models/DictionaryEntry.js')
const User = require('../models/User.js')
const Card = require('../models/Card.js')

/*
    word: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', // required: true },
    deck: { type: Schema.Types.ObjectId, ref: 'Deck', required: true },

    // study stats based on spaced repetition SM2 algorithm
    easinessFactor: { type: Number, default: 2.5 },
    repetitions: { type: Number, default: 0 },
    interval: { type: Number, default: 1},
    nextReview: { type: Date }
}, { timestamps: true })
*/

exports.createCard = async (req, res) => {
    const user = req.user
    const { cardId } = req.body
    console.log("user:", user, "cardId:", cardId)

    try {
        // validate user in db
        const _user = await User.findById(user.id)
        if (!_user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // validate card in db
        const entry = await Entry.findById(cardId)
        console.log("um entry??", entry)
        if (!entry) {
            return res.status(404).json({ message: 'Word not found' })
        }

        // validate dictionaryentry in db
        const card = await Card.create({
            user: _user._id,
            word: entry._id,
            nextReview: new Date()
        })

        return res.status(201).json({ message: 'new card created', card})


    } catch (e) {
        console.error(e)
        return res.status(400).send()

    }
}

exports.fetchCardsFromDeck = async (req, res) => {
    try {
        const _user = req.user
        const deckId = req.params.deckId

        const user = await User.findById(_user.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const cards = Card.find({ deck: deckId })
        return res.status(200).json({ cards })

    } catch (e) {
        console.error(e)
        return res.status(400).send()
    }
}

