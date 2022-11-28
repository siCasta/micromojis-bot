import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { findEmoji } from '../../services/axios/emojis.js'
import { SlashCommandI } from '../../types/command.js'
import { attachEmoji } from '../../utils/attachEmojis.js'
import { commandCooldown } from '../../utils/commandCooldown.js'

export default {
	data: new SlashCommandBuilder()
		.setName('findemoji')
		.setDescription('Find a emojis with the slug')
		.addStringOption(option =>
			option
				.setName('slug')
				.setDescription('The emoji slug to find')
				.setRequired(true)
		),
	async execute(interaction) {
		await commandCooldown(
			async () => {
				const slug = interaction.options.getString('slug', true)
				const emoji = await findEmoji(slug)

				if (!emoji)
					return await interaction.reply(`\`${slug}\` unknown slug`)

				const attachment = await attachEmoji(emoji, 512)
				const embed = new EmbedBuilder()
					.setAuthor({
						name: 'micromojis',
						iconURL: interaction.client.user.avatarURL()!,
						url: 'https://micromojis.dev'
					})
					.setColor('#eba834')
					.setTitle(emoji.name)
					.setThumbnail(`attachment://${emoji.slug}.png`)
					.setTimestamp()
					.setFooter({
						text: 'Emoji fetch from micromojis.dev'
					})
					.addFields({
						name: 'Emoji URL',
						value: `https://api.micromojis.dev/emojis/${emoji.slug}`
					})
					.addFields({
						name: 'Emoji file',
						value: emoji.emoji
					})
					.addFields({
						name: 'Emoji slug',
						value: emoji.slug
					})

				await interaction.reply({
					embeds: [embed],
					files: [attachment]
				})
			},
			3,
			interaction,
			'findemoji'
		)
	}
} as SlashCommandI
