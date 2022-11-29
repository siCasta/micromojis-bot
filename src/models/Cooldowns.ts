import db from './db.js'
import { ObjectId } from 'mongodb'

interface CooldownsSchema {
	_id?: ObjectId
	command: string
	userId: string
	cooldown: number
}

const Cooldowns = db.collection<CooldownsSchema>('cooldowns')

export default Cooldowns
