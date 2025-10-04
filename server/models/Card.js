const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
    word: { type: Schema.Types.ObjectId, ref: 'DictionaryEntry', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deck: { type: Schema.Types.ObjectId, ref: 'Deck' },

    // study stats based on spaced repetition SM2 algorithm
    easinessFactor: { type: Number, default: 2.5 },
    repetitions: { type: Number, default: 0 },
    interval: { type: Number, default: 1},
    nextReview: { type: Date }
}, { timestamps: true })

const Card = mongoose.model('Card', cardSchema)
module.exports = Card

