const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const deckController = require('../controllers/DeckController')

router.post('/create', requireAuth, deckController.createDeck)
router.get('/fetchDecks', requireAuth, deckController.fetchDecks)


module.exports = router