const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

router.post('/createUser', userController.createUser)
router.get('/fetchUser', requireAuth, userController.fetchUser)
router.post('/loginUser', userController.loginUser)
module.exports = router