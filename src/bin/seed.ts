import {
  PUSHSHIFT_COMMENTS_API,
  HATE_SUBS
} from '../lib/bootstrap'
import axios from 'axios'
import { createDbSchema, client, insertAuthor } from '../lib/db'
import { commentReducer } from '../lib/reduce'

const main = async () => {
  await client.connect()
  await createDbSchema()

  let before = Math.round(new Date().getTime() / 1000)
  let totalCount = 0
  const backInTime = before - (60 * 60 * 24 * 30)

  while (before > backInTime) {
    const badComments = (await axios.get(PUSHSHIFT_COMMENTS_API, {
      params: {
        subreddit: HATE_SUBS.toString(),
        size: 1000,
        before
      }
    })).data.data

    totalCount += badComments.length
    console.log(`${new Date(before * 1000).toISOString()}: ${totalCount}`)
    before = badComments[badComments.length-1].created_utc

    const authors = commentReducer(badComments)

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
