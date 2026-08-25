import { api } from './api'
import { HOST, NODE_ENV, PORT } from './config'

api.listen(PORT, () =>
  console.log(`Server listening at ${HOST}:${PORT} in ${NODE_ENV} mode`)
)
