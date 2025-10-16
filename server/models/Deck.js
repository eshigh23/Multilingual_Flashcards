const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deckSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    nativeLanguage: { type: String },
    targetLanguage: { type: String, required: true },
    direction: { type: String, enum: ['src-dst', 'dst-src'], default: 'src-dst'},
    numDueToday: { type: Number}

}, { timestamps: true })

const Deck = mongoose.model('Deck', deckSchema)
module.exports = Deck