import { Events } from 'discord.js'
import { EventI } from '../types/event.js'

export default {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! logged as ${client.user.username}`)
	}
} as EventI<Events.ClientReady>
