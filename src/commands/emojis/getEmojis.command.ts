import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { findEmoji } from '../../services/axios/emojis.js'
import { SlashCommandI } from '../../types/command.js'
import { attachEmoji } from '../../utils/attachEmojis.js'
import { commandCooldown } from '../../utils/commandCooldown.js'

export default {
	data: new SlashCommandBuilder()
		.setName('getemojis')
		.setDescription('Get all the emojis'),
	async execute(interaction) {
		await commandCooldown(async () => {}, 3, interaction, 'getemojis')
	}
} as SlashCommandI
