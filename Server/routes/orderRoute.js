import express from 'express'
import {postOrder} from '../controllers/orderController.js'
import Auth from '../middleware/Auth.js'
const router = express.Router()

// router.get('/')

router.post('/', Auth, postOrder)

export default router