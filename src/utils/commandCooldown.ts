import { ChatInputCommandInteraction } from 'discord.js'
import ms from 'ms'
import CD from '../services/models/cooldowns.js'

interface CommandCooldownOptions {
	content: string
	ephemeral: boolean
}

export const commandCooldown = async (
	callback: () => Promise<unknown>,
	cdTime: number,
	interaction: ChatInputCommandInteraction,
	commandName: string,
	options?: CommandCooldownOptions
) => {
	const command = commandName
	const userId = interaction.user.id
	const Cooldown = new CD({ command, userId })
	const cd = await Cooldown.getCooldown()

	if (!cd || Date.now() >= cd.cooldown) {
		await Cooldown.deleteCooldown()
		callback()
		await Cooldown.setCooldown(cdTime * 1000)
	} else {
		const timeToWait = ms(cd.cooldown - Date.now(), { long: true })
		const content = !!options?.content
			? `${options?.content} ${timeToWait}`
			: `You have to wait ${timeToWait}`
		const ephemeral = options?.ephemeral ?? true

		return await interaction.reply({ content, ephemeral })
	}
}
