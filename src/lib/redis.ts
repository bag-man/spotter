import { Tedis } from 'tedis'
import { Author } from '../types'

const tedis = new Tedis({
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || 'localhost'
})

const TTL = 60 * 60 * 24

export const saveProfile = async (profile: Author): Promise<void> => {
  tedis.command('SET', `user:${profile.author}`, JSON.stringify(profile), 'EX', TTL)
}
