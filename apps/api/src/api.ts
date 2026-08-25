import express, { type Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

export const api: Application = express()

api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(cors())
api.use(cookieParser())
api.use(morgan('dev'))

api.get('/', (_, res) => res.send('Hello world!'))
