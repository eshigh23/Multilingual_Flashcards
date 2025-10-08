const Deck = require('../models/Deck')

exports.createDeck = async (req, res) => {
    const user = req.user
    const { deckName, selectedLanguage } = req.body

    console.log("user:", user)

    try {
        const newDeck = await Deck.create({
            user: user.id,
            name: deckName,
            targetLanguage: selectedLanguage
        })

        return res.status(201).json({ newDeck })

    } catch (e) {
        console.error(e)
        return res.status(400).send()
    }
}


exports.fetchDecks = async (req, res) => {
    const user = req.user

    try {
        const decks = await Deck.find({ user: user.id })
        return res.status(200).json({ decks })

    } catch (e) {
        console.error(e)
        return res.status(500).send()
    }
}