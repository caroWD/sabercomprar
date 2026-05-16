import express from 'express'
import cookieParser from 'cookie-parser'
import { PORT } from './config/index.js'
import { corsMiddleware, errorMiddleware } from './middleware/index.js'
import {
  teamPermissionRouter,
  teamRoleRouter,
  permissionRouter,
  roleRouter,
  teamRouter,
  userRouter,
} from './modules/index.js'

const app = express()

app.use(express.json())
app.use(corsMiddleware())
app.use(cookieParser())

app.use('/api/team-permission', teamPermissionRouter)
app.use('/api/team-role', teamRoleRouter)

app.use('/api/permission', permissionRouter)
app.use('/api/role', roleRouter)

app.use('/api/team', teamRouter)

app.use('/api/user', userRouter)

app.use(errorMiddleware)

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
