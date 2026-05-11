import cors from 'cors'
import { ACCEPTED_ORIGINS } from '../config/index.js'

export const corsMiddleware = (
  acceptedOrigins: string[] = ACCEPTED_ORIGINS.split(',')
) =>
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      if (acceptedOrigins.includes(origin)) return callback(null, true)

      return callback(new Error('Not allowed by CORS.'))
    },
  })
