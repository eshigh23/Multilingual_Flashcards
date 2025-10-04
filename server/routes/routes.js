const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')


router.get('/api/hello', controller.getHello)
router.get('/getWords', controller.getWords)


module.exports = router