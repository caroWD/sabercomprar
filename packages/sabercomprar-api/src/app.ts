import express from 'express'
import cookieParser from 'cookie-parser'
import { PORT } from './config/index.js'
import { corsMiddleware, errorMiddleware } from './middleware/index.js'

const app = express()

app.use(express.json())
app.use(corsMiddleware())
app.use(cookieParser())

app.get('/', (_req, res) => res.send('Hello World!'))

app.use(errorMiddleware)

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
