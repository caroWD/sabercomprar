import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { PORT } from './config/index.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (_req, res) => res.send('Hello World!'))

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
