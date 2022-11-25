import { ClientEvents, Events } from 'discord.js'
import { Client } from '../config/classes.js'

export interface EventI<K extends keyof ClientEvents> {
	name: K
	once?: boolean
	execute: (...args: ClientEvents[K]) => Promise<void>
}
