import { Client, Configuration, ResultIterator } from 'ts-postgres'
import { ParsedComment } from '../types'

const PG_CONFIG: Configuration = {
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DATA,
}

export const client = new Client(PG_CONFIG)

export const createDbSchema = async (): Promise<void> => {
  await client.query(`
    DROP TABLE spotted;
  `)

  await client.query(`
    CREATE TABLE spotted (
      author text,
      subreddit text,
      postcount int,

      CONSTRAINT subreddit_author_unique UNIQUE (subreddit, author)
    );
  `)
}

export const insertAuthor = (x: ParsedComment): ResultIterator =>
  client.query(`
    INSERT INTO spotted (author, subreddit, postcount) VALUES ($1, $2, $3)
      ON CONFLICT ON CONSTRAINT subreddit_author_unique DO
      UPDATE SET postcount = EXCLUDED.postcount + spotted.postcount;
  `, [ x.author, x.subreddit, x.count ])

export const getLeaders = (): ResultIterator =>
  client.query(`
    select sum(postcount)::int as total_comments, author, array_agg(subreddit) as subreddits
    from spotted group by author order by total_comments desc limit 50;
  `)

