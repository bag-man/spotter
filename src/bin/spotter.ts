import { CREDENTIALS, DISCORD_WEBHOOK, BOTS, SCORE_THRESHOLD } from '../lib/bootstrap'
import RedditApi from 'reddit-ts'
import { compileAuthor } from '../lib/author'
import axios from 'axios'
import { Author, RawPost } from '../types'
import { saveSpot } from '../lib/redis'

const r = new RedditApi(CREDENTIALS)

const REQUEST_DELAY = 6 * 1000
const REQUEST_OFFSET = 1 * 1000

const notifyDiscord = async (profile: Author, submission: RawPost) => {
  const { score, author } = profile
  const { title, shortLink, subreddit } = submission
  let content = `[${score}pts] [${author}](<https://dotheyhate.us/${author}>)`
  content += `-> [${title}](<${shortLink}>) - ${subreddit}`

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

            const shortLink = `https://redd.it/${submission.id.substring(3)}`
            console.log(this.subreddit, profile.author, `${profile.score}pts`, shortLink)

            if (profile.score > SCORE_THRESHOLD) {
              await notifyDiscord(profile, { ...submission, shortLink })
              await saveSpot(profile, { ...submission, shortLink })
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
