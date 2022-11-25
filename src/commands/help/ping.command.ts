import { SlashCommandBuilder } from 'discord.js'
import { SlashCommandI } from '../../types/command.js'

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong'),
	async execute(interaction) {
		await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`)
	}
} as SlashCommandI
