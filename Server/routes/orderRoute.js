import express from 'express'
import {postOrder, getOrder, verifyPayment} from '../controllers/orderController.js'
import Auth from '../middleware/Auth.js'
const router = express.Router()

router.get('/', Auth, getOrder)

router.post('/', Auth, postOrder)

router.get('/verify-payment', verifyPayment);


export default router