import { REST, Routes } from 'discord.js'
import { join } from 'path'
import { dirname } from 'dirname-es'
import { SlashCommandI } from '../types/command.js'
import { readdirSync } from 'fs'
import env from '../config/env.js'

const __dirname = dirname(import.meta)
const commands = []

const commandsPath = join(__dirname, '..', 'commands')
const commandDirs = readdirSync(commandsPath)

for (const commandDir of commandDirs) {
	const commandDirsPath = join(commandsPath, commandDir)
	const commandFiles = readdirSync(commandDirsPath).filter(file =>
		file.includes('.command.')
	)

	for (const file of commandFiles) {
		const filePath = join('commands', commandDir, file)
		const command = (await import(`../${filePath}`))
			.default as SlashCommandI

		commands.push(command.data.toJSON())
	}
}

const rest = new REST({ version: '10' }).setToken(env.botToken)

try {
	await rest.put(Routes.applicationCommands(env.clientId), {
		body: commands
	})

	console.log(`Successfully reloaded application (/) commands.`)
} catch (err) {
	console.log(err)
}
