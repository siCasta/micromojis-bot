import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export interface SlashCommandI {
	data: SlashCommandBuilder
	execute: (interaction: CommandInteraction) => Promise<void>
}
