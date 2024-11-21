import express from 'express';
import { status, logout } from '../controllers/authController.js';
import Auth from '../middleware/Auth.js';
const router = express.Router();

router.get('/status', Auth, status);

router.post('/logout', logout);

export default router;
