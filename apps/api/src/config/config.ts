import { config } from 'dotenv'
import { object, enum as enum_, coerce, string } from 'zod'

config({ path: ['.env.local', '.env'] })

const envSchema = object({
  NODE_ENV: enum_(['development', 'production', 'test']).default('development'),
  HOST: string().default('http://localhost'),
  PORT: coerce.number().default(3000),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format)
  process.exit(1)
}

export const { NODE_ENV, HOST, PORT } = parsedEnv.data
