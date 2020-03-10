import {
  COMMENTS_API,
  HATE_SUBS
} from '../lib/bootstrap'
import axios from 'axios'
import { createDbSchema, client, insertAuthor } from '../lib/db'
import { seedReducer } from '../lib/reduce'
import { sleep } from '../lib/utils'

const main = async () => {
  await client.connect()
  await createDbSchema()

  let before = Math.round(new Date().getTime() / 1000)
  let totalCount = 0
  let badComments
  const backInTime = before - (60 * 60 * 24 * 30)
  let attempts = 0

  while (before > backInTime) {
    try {
      badComments = (await axios.get(COMMENTS_API, {
        params: {
          subreddit: HATE_SUBS.toString(),
          size: 1000,
          before
        }
      })).data.data
    } catch (cause) {
      attempts++
      const debounce = Math.pow(attempts, 2)
      console.log(`Failed to fetch from before ${before}, sleeping ${debounce} then retrying`)
      await sleep(debounce)
      continue
    }

    attempts = 0

    totalCount += badComments.length
    console.log(`${new Date(before * 1000).toISOString()}: ${totalCount}`)
    before = badComments[badComments.length-1].created_utc

    const authors = await seedReducer(badComments)

    await client.query('BEGIN')
    authors.map(insertAuthor)
    await client.query('COMMIT')
  }

  await client.end()
}

try {
  main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
