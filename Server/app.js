import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import DBconnect from './config/config.js'

const app = express()
dotenv.config()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
const PORT = process.env.PORT||8080

DBconnect()


app.use('/api/user', userRoute)


app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT,() => {
    console.log(`server is running on http://localhost:${PORT}`)
})