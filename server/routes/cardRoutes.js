const express = require('express')
const router = express.Router()
const cardController = require('../controllers/CardController')
const requireAuth = require('../middleware/requireAuth')

router.post('/createCard', requireAuth, cardController.createCard)
router.get('/card/:deckId/cards', requireAuth, cardController.fetchCardsFromDeck)

module.exports = router