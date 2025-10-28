const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const deckController = require('../controllers/DeckController')

router.post('/create', requireAuth, deckController.createDeck)
router.delete('/delete/:deckId', requireAuth, deckController.deleteDeck)
router.get('/fetchDecks', requireAuth, deckController.fetchDecksForUser)


module.exports = router