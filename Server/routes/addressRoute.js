import express from 'express';
import {getAddress, postAddress } from '../controllers/addressController.js';
import Auth from '../middleware/Auth.js';
const router = express.Router();

router.get('/', Auth, getAddress);

router.post('/', Auth, postAddress);

export default router;
