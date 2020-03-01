import {
  COMMENTS_API,
  SUBMISSION_API
} from '../lib/bootstrap'

import * as express from 'express'
import * as logger from 'morgan'
import * as compression from 'compression'
import { getAuthor, Profile } from '../lib/author'
import { authorToMarkdown } from '../lib/markdown'
// import { client, getLeaderboard } from '../lib/db'

const app = express()
const port = process.env.PORT || 3000

app.use(logger('dev'))
app.use(compression())

app.get('/favicon.ico', (_req, res) => res.status(204))

app.get('/', async (req, res, next): Promise<void> => {
  try {
    res.setHeader('content-type', 'text/plain')
    res.send('Hi Jenny!')
  } catch (e) {
    next(e)
  }
})

// app.get('/leaderboard', async (req, res, next): Promise<void> => {
//   try {
//     res.setHeader('content-type', 'application/json')
//     res.send(await getLeaderboard())
//   } catch (e) {
//     next(e)
//   }
// })

app.get('/:author', async (req, res, next): Promise<void> => {
  try {
    const { author } = req.params
    const comments = await getAuthor(author, COMMENTS_API)
    const submissions = await getAuthor(author, SUBMISSION_API)
    const content: Profile = { author, comments, submissions }
    const markdown = authorToMarkdown(content)

    res.setHeader('content-type', 'application/json')
    res.send({ ...content, markdown })
  } catch (e) {
    next(e)
  }
})

app.listen(port, async () => {
  // await client.connect()
  console.log(`Listening on http://localhost:${port}`)
})
