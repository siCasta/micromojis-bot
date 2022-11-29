import { EmojiResponse, EmojisResponse } from '../../types/emojis.js'
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

export const getEmojis = async () => {
	try {
		const { data } = await emojisInstance.get<EmojisResponse>('/emojis', {
			params: {
				emojis: 10
			}
		})

		return data.emojis
	} catch (err) {
		return null
	}
}
