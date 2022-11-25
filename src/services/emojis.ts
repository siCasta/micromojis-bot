import { EmojiResponse } from '../types/emojis.js'
import { emojisInstance } from './instances.js'

export const findEmoji = async (slug: string) => {
	try {
		const { data } = await emojisInstance.get<EmojiResponse>(
			`/emojis/${slug}`
		)

		return data.emoji
	} catch (err) {
		return null
	}
}
