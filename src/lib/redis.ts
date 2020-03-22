import { Tedis } from 'tedis'
import { Author } from '../types'

const tedis = new Tedis({
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || 'localhost'
})

const TTL = 60 * 60 * 24

export const saveProfile = async (profile: Author): Promise<void> => {
  const key = `user:${profile.author}`
  await tedis.command('SET', key, JSON.stringify(profile), 'EX', TTL)
}

export const getProfile = async (user: string): Promise<Author | null> => {
  const profile = await tedis.get(`user:${user}`)
  if (!profile) {
    return null
  }

  return JSON.parse(profile as string)
}
