export interface EmojisResponse {
	message?: string
	emojis?: Array<Emoji>
	error?: string
}

export interface EmojiResponse {
	message?: string
	emoji?: Emoji
	error?: string
}

export interface EmojiSchema {
	slug: string
	name: string
	emoji: string
}

export interface Emoji extends EmojiSchema {
	url?: string
}
