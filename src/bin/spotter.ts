import { CREDENTIALS, DISCORD_WEBHOOK, BOTS, SCORE_THRESHOLD } from '../lib/bootstrap'
import RedditApi from 'reddit-ts'
import { compileAuthor } from '../lib/author'
import axios from 'axios'
import { Author } from '../types'

const r = new RedditApi(CREDENTIALS)

const REQUEST_DELAY = 6 * 1000
const REQUEST_OFFSET = 1 * 1000

type Post = {
  id: string
  url: string
  author: string
  subreddit: string
  title: string
  body: string
  date: Date
}

const notifyDiscord = async (profile: Author, submission: Post) => {
  let content = `[${profile.score}pts] [${profile.author}](<https://dotheyhate.us/${profile.author}>)`
  content += `-> [${submission.title}](https://redd.it/${submission.url.split('/')[6]}) - ${submission.subreddit}`

  await axios.post(DISCORD_WEBHOOK, { content })
}


class Watcher {
  private subreddit: string;

  constructor (subreddit: string) {
    this.subreddit = subreddit
  }

  async watch () {
    const seen: string[] = []
    let first = true

    while (true) {
      const submissions = await r.threads(this.subreddit)
        .catch(err => console.error(`Failed to query reddit: ${err.message}`))

      if (submissions) {
        await Promise.all(submissions.map(async submission => {
          if (first) {
            seen.push(submission.id)
          }

          if (!seen.includes(submission.id) && !BOTS.find(n => n === submission.author)) {
            const profile = await compileAuthor(submission.author)

            console.log(this.subreddit, profile.author, `${profile.score}pts`)

            if (profile.score > SCORE_THRESHOLD) {
              await notifyDiscord(profile, submission)
            }

            seen.push(submission.id)

            if (seen.length > 50) {
              seen.shift()
            }
          }
        }))
      }

      first = false
      await sleep(REQUEST_DELAY)
    }
  }
}

const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {
  const subreddits = [ 'ukpolitics', 'videos', 'gifs', 'worldnews', 'funny', 'news', 'gaming' ]

  for(const sub of subreddits) {
    new Watcher(sub).watch()
    await sleep(REQUEST_OFFSET)
  }

  console.log('Listening for the hate...')
}

main()
