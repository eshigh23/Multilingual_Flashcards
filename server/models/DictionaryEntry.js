const mongoose = require('mongoose')


const translationSchema = new mongoose.Schema({
    en_word: { type: String, required: true },
    sp_count: { type: Number, required: true },
    en_count: { type: Number, required: true },
    probability: { type: Number, required: true },
    POS: { type: String, required: true },
    gender: { type: String, default: null },
    article: { type: String, default: null},
})

const dictionarySchema = new mongoose.Schema({
    sp_word: { type: String, required: true },
    translations: [translationSchema]
})

const DictionaryEntry = mongoose.model("DictionaryEntry", dictionarySchema);

module.exports = DictionaryEntry