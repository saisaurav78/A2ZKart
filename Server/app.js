import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import cartRoute from './routes/cartRoute.js'
import addressRoute from './routes/addressRoute.js'
import DBconnect from './config/config.js'
import authRoute from './routes/authRoute.js'

const app = express()
app.use(cookieParser())
dotenv.config()
app.use(cors(
    {
        origin: process.env.FRONTEND_URI,
        credentials:true
    }
))

app.use(express.json())
const PORT = process.env.PORT||8080

DBconnect()

app.use('/api/user', userRoute)

app.use('/api/auth', authRoute)

app.use('/api/address', addressRoute)

app.use('/api/cart', cartRoute)

app.use('/api/orders', orderRoute)

app.get('/', (req, res) => {
    res.send('Server is Running')
})

app.listen(PORT,() => {
    console.log(`server is running on http://localhost:${PORT}`)
})
