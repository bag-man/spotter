import {
  PUSHSHIFT_COMMENTS_API,
  SEED_DB,
  HATE_SUBS
} from './bootstrap'

import axios from 'axios'
import { createDbSchema, client } from './db'
import { commentReducer } from './reduce'

const main = async () => {
  await client.connect()

  if (SEED_DB) {
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

      client.query('BEGIN')

      authors.map(x => client.query(`
          INSERT INTO spotted (author, subreddit, postcount) VALUES ($1, $2, $3)
            ON CONFLICT ON CONSTRAINT subreddit_author_unique DO
            UPDATE SET postcount = EXCLUDED.postcount + spotted.postcount;
      `, [ x.author, x.subreddit, x.count ]))

      await client.query('COMMIT')
    }
  }

  const output = await client.query(`
    select sum(postcount) as total_comments, author, array_agg(subreddit) as subreddits from spotted group by author order by total_comments desc limit 10;
  `)

  console.log(output.rows)

  await client.end()
}

try {
  main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
