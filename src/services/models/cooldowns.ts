import CD from '../../models/Cooldowns.js'

interface CooldownsConstructor {
	command: string
	userId: string
}

interface SetCooldownValues {
	command: string
	userId: string
	cooldown: number
}

export default class Cooldowns {
	private model: typeof CD
	private command: string
	private userId: string

	constructor({ command, userId }: CooldownsConstructor) {
		this.model = CD
		this.command = command
		this.userId = userId
	}

	async getCooldown() {
		const command = this.command
		const userId = this.userId

		const cooldown = await this.model.findOne({ command, userId })

		return cooldown
	}

	async deleteCooldown() {
		const command = this.command
		const userId = this.userId

		const existCooldown = await this.existCooldown()

		if (!existCooldown) return false

		await this.model.deleteOne({ command, userId })

		return true
	}

	async existCooldown() {
		const cooldown = await this.getCooldown()

		return !!cooldown
	}

	async setCooldown(cooldown: number) {
		const existCooldown = await this.existCooldown()

		if (existCooldown) return false

		const values: SetCooldownValues = {
			command: this.command,
			userId: this.userId,
			cooldown: Date.now() + cooldown
		}

		await this.model.insertOne(values)

		return true
	}
}
