import axios from 'axios'

export const emojisInstance = axios.create({
	baseURL: 'https://api.micromojis.dev'
})
