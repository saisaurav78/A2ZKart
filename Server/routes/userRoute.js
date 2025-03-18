import express from 'express'
import {login, OAuth, OAuthCB, register} from '../controllers/userController.js'
const router = express.Router()


router.post('/login', login)

router.post('/register', register)

router.get('/google/OAuth', OAuth)

router.get('/google/callback',OAuthCB)

export default router