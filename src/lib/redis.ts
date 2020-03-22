import * as moment from 'moment'
import { Tedis } from 'tedis'
import { Author, RawPost } from '../types'

const tedis = new Tedis({
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || 'localhost'
})

const TTL = 60 * 60 * 24

export const saveProfile = async (profile: Author): Promise<void> => {
  const key = `user:${profile.author}`.toLowerCase()
  await tedis.command('SET', key, JSON.stringify(profile), 'EX', TTL)
}

export const getProfile = async (user: string): Promise<Author | null> => {
  const key = `user:${user}`.toLowerCase()
  const profile = await tedis.get(key)
  if (!profile) {
    return null
  }

  return JSON.parse(profile as string)
}

export const saveSpot = async (profile: Author, submission: RawPost): Promise<void> => {
  const key = `spot:${profile.author}`.toLowerCase()
  await tedis.command('SET', key, JSON.stringify({ ...profile, ...submission }), 'EX', TTL)
}

export const getSpots = async (): Promise<null | any[]> => {
  // TODO: type this up properly
  const keys = await tedis.keys(`spot:*`)
  if (keys.length) {
    /* eslint-disable-next-line */
    let spots: any[] = await tedis.mget(keys.pop()!, ...keys)
    spots = spots.map(spot => JSON.parse(spot as string) as Author)
    return spots.map(spot => ({ ...spot, since: moment(spot.date).fromNow() })).sort((a, b) => b.date > a.date ? 1 : -1)
  }
  return null
}
