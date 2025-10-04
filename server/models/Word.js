const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wordSchema = new Schema({
    word: { type: String, required: true },
    translation: { type: String, required: true },
    partOfSpeech: { type: String },
    gender: { type: String, enum: ['f', 'm'], default: null},
    article: { type: String, enum: ['el', 'la'], default: null },
    examples: [{ type: String }],
    sourceLanguage: { type: String, default: "es" },
    translationLanguage: { type: String, default: "en" }
}, { timestamps: true })

wordSchema.index({ word: 1, sourceLanguage: 1 });
const Word = mongoose.model('Word', wordSchema)

module.exports = Word