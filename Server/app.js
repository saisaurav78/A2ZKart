import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit'; 

import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';
import cartRoute from './routes/cartRoute.js';
import addressRoute from './routes/addressRoute.js';
import authRoute from './routes/authRoute.js';
import DBconnect from './config/config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware Setup
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  }),
);
app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests from this IP, please try again later.',
    });
  },
});

app.use(generalLimiter); // applies to all routes generally

DBconnect();

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/address', addressRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);

app.get('/', (req, res) => {
  res.send('Server is Running');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
