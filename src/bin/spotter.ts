import { CREDENTIALS, DISCORD_WEBHOOK, BOTS, SCORE_THRESHOLD } from '../lib/bootstrap'
import RedditApi from 'reddit-ts'
import { compileAuthor } from '../lib/author'
import axios from 'axios'
import { Author } from '../types'

const r = new RedditApi(CREDENTIALS)

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

const main = async () => {
  const seen: string[] = []
  let first = true

  while (true) {
    const submissions = await r.threads('askreddit')

    for (const submission of submissions) {
      if (first) {
        seen.push(submission.id)
      }

      if (!seen.includes(submission.id) && !BOTS.find(n => n === submission.author)) {
        const profile = await compileAuthor(submission.author)

        console.log(`${profile.author}: ${profile.score}`)

        if (profile.score > SCORE_THRESHOLD) {
          await notifyDiscord(profile, submission)
        }

        seen.push(submission.id)

        if (seen.length > 50) {
          seen.shift()
        }
      }
    }

    first = false
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
}

main()
