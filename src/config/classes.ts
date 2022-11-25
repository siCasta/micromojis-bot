import { Client as ClientDiscord, ClientOptions, Collection } from 'discord.js'

export class Client extends ClientDiscord {
	commands: Collection<string, Record<string, unknown>>

	constructor(options: ClientOptions) {
		super(options)
		this.commands = new Collection()
	}
}
