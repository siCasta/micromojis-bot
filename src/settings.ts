import { Events, GatewayIntentBits } from 'discord.js'
import { join } from 'path'
import { Client } from './config/classes.js'
import { dirname } from 'dirname-es'
import { readdirSync } from 'fs'
import { SlashCommandI } from './types/command.js'
import Cooldowns from './services/models/cooldowns.js'
import ms from 'ms'

const __dirname = dirname(import.meta)
const client = new Client({
	intents: [GatewayIntentBits.Guilds]
})

const commandsPath = join(__dirname, 'commands')
const commandDirs = readdirSync(commandsPath)

for (const commandDir of commandDirs) {
	const commandDirsPath = join(commandsPath, commandDir)
	const commandFiles = readdirSync(commandDirsPath).filter(file =>
		file.includes('.command.')
	)

	for (const file of commandFiles) {
		const filePath = join('commands', commandDir, file)
		const command = (await import(`./${filePath}`)).default as SlashCommandI

		if ('data' in command && 'execute' in command)
			client.commands.set(command.data.name, command)
		else
			console.warn(
				`The command at ${filePath} is missing data or execute`
			)
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return

	const command = client.commands.get(interaction.commandName)

	if (!command) {
		console.error(
			`No command matching ${interaction.commandName} was found.`
		)
		return
	}

	try {
		const cdService = new Cooldowns({
			command: command.data.name,
			userId: interaction.user.id
		})

		if (!!command.cooldown) {
			const cd = await cdService.getCooldown()

			if (!cd || Date.now() >= cd.cooldown) {
				await cdService.deleteCooldown()
				command.execute(interaction)
				await cdService.setCooldown(command.cooldown * 1000)
			} else {
				const timeToWait = ms(cd.cooldown - Date.now(), {
					long: true
				})

				await interaction.reply({
					content: `You have to wait \` ${timeToWait} \``,
					ephemeral: true
				})

				return
			}
		} else {
			await command.execute(interaction)
		}
	} catch (error) {
		console.error(error)
		await interaction.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true
		})
	}
})

const eventsPath = join(__dirname, 'events')
const eventFiles = readdirSync(eventsPath)

for (const file of eventFiles) {
	const filePath = join('events', file)
	const event = (await import(`./${filePath}`)).default

	if (event.once) client.once(event.name, (...args) => event.execute(...args))
	else client.on(event.name, (...args) => event.execute(...args))
}

export default client
