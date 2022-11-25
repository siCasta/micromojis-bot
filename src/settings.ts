import { GatewayIntentBits, Events, Collection } from 'discord.js'
import { Client } from './config/classes'

const client = new Client({
	intents: [GatewayIntentBits.Guilds]
})

client.once(Events.ClientReady, c => {
	console.log(`Ready logged as ${c.user.username}`)
})

export default client
