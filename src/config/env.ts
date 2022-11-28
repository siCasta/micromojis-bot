import 'dotenv/config'
import { env } from 'process'

interface Env {
	botToken: string
	clientId: string
	mongoUri: string
}

export default {
	botToken: env.BOT_TOKEN!,
	clientId: env.CLIENT_ID!,
	mongoUri: env.MONGO_URI!
} as Env
