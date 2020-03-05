import {
  COMMENTS_API,
  SUBMISSION_API
} from '../lib/bootstrap'

import * as express from 'express'
import * as logger from 'morgan'
import * as compression from 'compression'
import { getAuthor, Profile } from '../lib/author'
import { authorToMarkdown } from '../lib/markdown'
import { client, getLeaderboard } from '../lib/db'
import { join } from 'path'
import { compileFile } from 'pug'

const app = express()
const port = process.env.PORT || 3000

const homeTemplate = compileFile(join(__dirname,  '../../src/assets/templates/home.pug'))
const authorTemplate = compileFile(join(__dirname,  '../../src/assets/templates/author.pug'))

app.use(logger('dev'))
app.use(compression())
app.use('/assets', express.static(join(__dirname, '../assets')))

app.get('/', async (_req, res, next): Promise<void> => {
  try {
    const leaderboard = await getLeaderboard()
    res.setHeader('content-type', 'text/html')
    res.send(homeTemplate({ leaderboard }))
  } catch (e) {
    next(e)
  }
})

app.get('/api/leaderboard', async (_req, res, next): Promise<void> => {
  try {
    res.setHeader('content-type', 'application/json')
    res.send(await getLeaderboard())
  } catch (e) {
    next(e)
  }
})

app.get('/author', async (req, res, next): Promise<void> => {
  try {
    const { user: author } = req.query
    const comments = await getAuthor(author, COMMENTS_API)
    const submissions = await getAuthor(author, SUBMISSION_API)
    const content: Profile = { author, comments, submissions }
    const markdown = authorToMarkdown(content)

    res.setHeader('content-type', 'text/html')
    res.send(authorTemplate({...content, markdown }))
  } catch (e) {
    next(e)
  }
})

app.get('/:api?/:author', async (req, res, next): Promise<void> => {
  try {
    const { api, author } = req.params
    const comments = await getAuthor(author, COMMENTS_API)
    const submissions = await getAuthor(author, SUBMISSION_API)
    const content: Profile = { author, comments, submissions }
    const markdown = authorToMarkdown(content)

    if (api) {
      res.setHeader('content-type', 'application/json')
      res.send({ ...content, markdown })
      return next()
    }

    res.setHeader('content-type', 'text/html')
    res.send(authorTemplate({...content, markdown }))
  } catch (e) {
    next(e)
  }
})

app.listen(port, async () => {
  await client.connect()
  console.log(`Listening on http://localhost:${port}`)
})
