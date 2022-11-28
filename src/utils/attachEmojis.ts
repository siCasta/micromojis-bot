import { createCanvas, loadImage } from 'canvas'
import { AttachmentBuilder } from 'discord.js'
import { Emoji } from '../types/emojis'

type ExtensionOptions = 'png' | 'svg' | 'jpg'

export const attachEmoji = async (
	emoji: Emoji,
	size: number,
	extension: ExtensionOptions = 'png'
) => {
	const canvas = createCanvas(size, size)
	const ctx = canvas.getContext('2d')
	const image = await loadImage(emoji.emoji)

	ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

	const attachment = new AttachmentBuilder(canvas.toBuffer(), {
		name: `${emoji.slug}.${extension}`
	})

	return attachment
}
