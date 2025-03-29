import express from 'express';
import {getAddress} from '../controllers/addressController.js';
import Auth from '../middleware/Auth.js';
const router = express.Router();

router.get('/', Auth, getAddress);

export default router;
