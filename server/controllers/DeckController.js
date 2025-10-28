const Deck = require('../models/Deck')

exports.createDeck = async (req, res) => {
    const user = req.user
    const { deckName, selectedLanguage } = req.body

    console.log("user:", user)

    try {
        await Deck.create({
            user: user.id,
            name: deckName,
            targetLanguage: selectedLanguage
        })

        const updatedDecks = await fetchDecksForUserService(user.id)

        return res.status(201).json({ updatedDecks })

    } catch (e) {
        console.error(e)
        return res.status(400).send()
    }
}

exports.deleteDeck = async (req, res) => {
    const { deckId } = req.params
    const user = req.user
    console.log("deckId:", deckId)

    try {
        await Deck.findByIdAndDelete(deckId)
        const updatedDecks = await fetchDecksForUserService(user.id)
        return res.status(200).send({ updatedDecks })

    } catch (e) {
        return res.status(400).send()
    }
}


exports.fetchDecksForUser = async (req, res) => {
    const user = req.user

    try {
        const decks = await fetchDecksForUserService(user.id)
        return res.status(200).json({ decks })

    } catch (e) {
        console.error(e)
        return res.status(500).send()
    }
}


const fetchDecksForUserService = async (userId) => {
    try {
        const decks = await Deck.find({ user: userId }).populate({
            path: 'cardsDueToday',
            match: { nextReview: { $lte: new Date() } } // evaluated at query time
        })  
        return decks
    } catch (e) {
        throw new Error('Unable to query decks for the user')
    }
}
