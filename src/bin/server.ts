import * as express from 'express'
import * as logger from 'morgan'
import * as compression from 'compression'
import { fetchAuthor } from '../lib/author'
import { client, getLeaders } from '../lib/db'
import { join } from 'path'
import { compileFile } from 'pug'

const app = express()
const port = process.env.PORT || 3000
const cacheTTL = 60 * 60 * 24

const homeTemplate = compileFile(join(__dirname,  '../../src/assets/html/home.pug'))
const authorTemplate = compileFile(join(__dirname,  '../../src/assets/html/author.pug'))

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

app.get('/:api?/:author', async (req, res, next): Promise<void> => {
  try {
    const { api, author } = req.params
    const authorData = await fetchAuthor(author)

    if (api) {
      res.setHeader('content-type', 'application/json')
      res.send(authorData)
      return next()
    }

    res.setHeader('content-type', 'text/html')
    res.send(authorTemplate(authorData))
  } catch (e) {
    next(e)
  }
})

app.listen(port, async () => {
  await client.connect()
  console.log(`Listening on http://localhost:${port}`)
})
