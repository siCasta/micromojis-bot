import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export interface SlashCommandI {
	data: SlashCommandBuilder
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>
	cooldown?: number
}
