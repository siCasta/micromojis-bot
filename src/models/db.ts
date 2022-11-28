import { MongoClient } from 'mongodb'
import env from '../config/env.js'

const client = new MongoClient(env.mongoUri)

await client.connect()

const db = client.db('micromojis-bot')

export default db
