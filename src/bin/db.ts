import { Client } from 'ts-postgres';

export const client = new Client({
  password: process.env.PG_PASS!,
  host: 'localhost',
  user: 'postgres',
  port: 5432
});

export const createDbSchema = async () => {
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
