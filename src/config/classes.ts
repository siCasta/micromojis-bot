import { Client as ClientDiscord, ClientOptions, Collection } from 'discord.js'
import { SlashCommandI } from '../types/command.js'

export class Client extends ClientDiscord {
	commands: Collection<string, SlashCommandI>

	constructor(options: ClientOptions) {
		super(options)
		this.commands = new Collection()
	}
}
