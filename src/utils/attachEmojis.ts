import { createCanvas, loadImage } from 'canvas'
import { AttachmentBuilder } from 'discord.js'
import { Extension } from '../types/attachEmojis.js'
import { Emoji } from '../types/emojis.js'

interface AttachEmojisOptions {
	emoji: Emoji
	size?: number
	extension?: Extension
}

export const attachEmoji = async (options: AttachEmojisOptions) => {
	const emoji = options.emoji
	const size = options.size ?? 256
	const extension = options.extension ?? 'png'

	const canvas = createCanvas(size, size)
	const ctx = canvas.getContext('2d')
	const image = await loadImage(emoji.emoji)

	ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

	const attachment = new AttachmentBuilder(canvas.toBuffer(), {
		name: `${emoji.slug}.${extension}`
	})

	return attachment
}
