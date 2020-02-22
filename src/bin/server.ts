import {
  PUSHSHIFT_COMMENTS_API,
  HATE_SUBS
} from '../lib/bootstrap'
import axios from 'axios'
import * as express from 'express'
import * as logger from 'morgan'
import * as compression from 'compression'
import { authorReducer } from '../lib/reduce'

const app = express()
const port = process.env.PORT || 3000

app.use(logger('dev'))
app.use(compression())

app.get('/:user', async (req, res, next) => {
  try {
    const author = req.params.user
    const comments = []
    let before = Math.round(new Date().getTime() / 1000)

    while (!(comments.length % 1000)) {
      comments.push(...(await axios.get(PUSHSHIFT_COMMENTS_API, {
        params: {
          subreddit: HATE_SUBS.toString(),
          size: 1000,
          author,
          before
        }
      })).data.data)

      if (!comments.length) break
      before = comments[comments.length-1].created_utc
    }

    res.setHeader('content-type', 'application/json')
    res.send({ author, reduced: authorReducer(comments) })
  } catch (e) {
    next(e)
  }
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
