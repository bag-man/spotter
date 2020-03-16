import * as express from 'express'
import * as logger from 'morgan'
import * as compression from 'compression'
import { compileAuthor, compileAuthorWord } from '../lib/author'
import { client, getLeaders } from '../lib/db'
import { join } from 'path'
import { compileFile } from 'pug'

const app = express()
const port = process.env.PORT || 3000
const cacheTTL = 60 * 60 * 24

const homeTemplate = compileFile(join(__dirname,  '../../src/assets/html/home.pug'))
const profileTemplate = compileFile(join(__dirname,  '../../src/assets/html/profile.pug'))

app.use(logger('dev'))
app.use(compression())
app.use('/assets', express.static(join(__dirname, '../assets')))
app.use((_req, res, next) => {
  res.header('Cache-Control', `max-age=${cacheTTL}`)
  next()
})

app.get('/', async (_req, res, next): Promise<void> => {
  try {
    const leaderboard = await getLeaders()
    res.setHeader('content-type', 'text/html')
    res.send(homeTemplate({ leaderboard }))
  } catch (e) {
    next(e)
  }
})

app.get('/:author/:subreddit', async (req, res, next): Promise<void> => {
  try {
    const { author, subreddit } = req.params
    const profile = await compileAuthor(author, subreddit)

    res.setHeader('content-type', 'text/html')
    res.send(profileTemplate(profile))
  } catch (e) {
    next(e)
  }
})

app.get('/:author/word/:word', async (req, res, next): Promise<void> => {
  try {
    const { author, word } = req.params
    const profile = await compileAuthorWord(author, word)

    res.setHeader('content-type', 'text/html')
    res.send(profileTemplate(profile))
  } catch (e) {
    next(e)
  }
})

app.get('/:author', async (req, res, next): Promise<void> => {
  try {
    const { author } = req.params
    const { json } = req.query
    const authorData = await compileAuthor(author)

    if (json) {
      res.setHeader('content-type', 'application/json')
      res.send(authorData)
      return next()
    }

    res.setHeader('content-type', 'text/html')
    res.send(profileTemplate(authorData))
  } catch (e) {
    next(e)
  }
})

app.listen(port, async () => {
  await client.connect()
  console.log(`Listening on http://localhost:${port}`)
})
