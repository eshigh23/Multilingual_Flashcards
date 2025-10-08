const express = require('express')
const router = express.Router()
const cardController = require('../controllers/CardController')
const requireAuth = require('../middleware/requireAuth')

router.post('/createCard', requireAuth, cardController.createCard)
router.get('/fetchCards/:deckId', requireAuth, cardController.fetchDueCardsFromDeck)
router.put('/updateCard', requireAuth, cardController.updateCard)

module.exports = router