import express from 'express'
import rateLimit from 'express-rate-limit';
import {login, OAuth, OAuthCB, register} from '../controllers/userController.js'
const router = express.Router()

const createLimiter = (maxRequests, windowMs, message) => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    handler: (req, res) => {
      res.status(429).json({ message });
    },
  });
};

const loginLimiter = createLimiter(
  5,
  10 * 60 * 1000,
  'Too many login attempts, please try again after 10 minutes.',
);

const registerLimiter = createLimiter(
  5,
  10 * 60 * 1000,
  'Too many registration attempts, please try again after 10 minutes.',
);


router.post('/login', loginLimiter, login);

router.post('/register', registerLimiter, register);

router.get('/google/OAuth', OAuth);

router.get('/google/callback',OAuthCB)

export default router