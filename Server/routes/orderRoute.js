import express from 'express'
import {postOrder, getOrder} from '../controllers/orderController.js'
import Auth from '../middleware/Auth.js'
const router = express.Router()

router.get('/', Auth, getOrder)

router.post('/', Auth, postOrder)

export default router