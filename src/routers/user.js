const { Router } = require('express')
const { loginUser } = require('../controllers/userController')

const router = Router()

router.post('/register')
router.post('/login', loginUser)

module.exports = router
