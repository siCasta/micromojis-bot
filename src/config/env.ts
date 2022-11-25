import 'dotenv/config'
import { env } from 'process'

export default {
	botToken: env.BOT_TOKEN!,
	clientId: env.CLIENT_ID
}
