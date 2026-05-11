import { DrizzleError } from 'drizzle-orm'
import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  next
) => {
  if (error instanceof ZodError)
    res.status(400).json({ message: JSON.parse(error.message), state: false })

  if (error instanceof DrizzleError)
    res.status(500).json({ message: error.message, state: false })

  if (error instanceof Error)
    res.status(500).json({ message: error.message, status: false })

  res.status(500).json({ message: 'Something went wrong!', state: false })

  next(error)
}
