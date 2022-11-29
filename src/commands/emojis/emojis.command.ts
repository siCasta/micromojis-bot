import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { findEmoji } from '../../services/axios/emojis.js'
import { Extension, Extensions } from '../../types/attachEmojis.js'
import { SlashCommandI } from '../../types/command.js'
import { attachEmoji } from '../../utils/attachEmojis.js'

export default {
	data: new SlashCommandBuilder()
		.setName('emojis')
		.setDescription('All the options for the emojis')
		.addSubcommand(subCommand =>
			subCommand
				.setName('file')
				.setDescription('Get the file of a emoji in png or jpg')
				.addStringOption(option =>
					option
						.setName('slug')
						.setDescription('The emoji slug to find')
						.setRequired(true)
				)
				.addStringOption(option =>
					option
						.setName('type')
						.setDescription('The type of file svg, png or jpg')
						.addChoices(
							{ name: 'png', value: 'png' },
							{ name: 'jpg', value: 'jpg' }
						)
						.setRequired(true)
				)
				.addNumberOption(option =>
					option
						.setName('size')
						.setDescription('The size of the emoji')
				)
		)
		.addSubcommand(subCommand =>
			subCommand
				.setName('find')
				.setDescription('Find a emojis with the slug')
				.addStringOption(option =>
					option
						.setName('slug')
						.setDescription('The emoji slug to find')
						.setRequired(true)
				)
		),
	async execute(interaction) {
		const command = interaction.options.getSubcommand()
		const slug = interaction.options.getString('slug', true)
		const emoji = await findEmoji(slug)

		if (!emoji)
			return await interaction.reply({
				content: `Unknown slug **\` ${slug} \`**`,
				ephemeral: true
			})

		switch (command) {
			case 'file':
				{
					const extension =
						(interaction.options.getString('type') as Extension) ??
						'png'
					const size = interaction.options.getNumber('size') ?? 256

					if (!['png', 'jpg'].includes(extension)) {
						await interaction.reply({
							content: `This file extension does not exists **\` ${extension} \`**`,
							ephemeral: true
						})
						return
					}
					if (size > 1024 || size < 128) {
						await interaction.reply({
							content: `Size has to be between 128 - 1024, your size **\` ${size} \`**`,
							ephemeral: true
						})
						return
					}

					const attachment = await attachEmoji({
						emoji,
						size,
						extension
					})

					await interaction.reply({
						content: `**${emoji.name}** - <@${interaction.user.id}>`,
						files: [attachment]
					})
				}
				break

			case 'find':
				{
					const attachment = await attachEmoji({
						emoji,
						size: 512
					})
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
				}
				break
		}
	},
	cooldown: 5
} as SlashCommandI
