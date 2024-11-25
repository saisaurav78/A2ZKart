import express from 'express';
import Auth from '../middleware/Auth.js'
import { getCart, postCart} from '../controllers/cartController.js';
const router = express.Router();

router.get('/', Auth, getCart);

router.post('/', Auth, postCart);



export default router;
