import { CREDENTIALS, DISCORD_WEBHOOK } from '../lib/bootstrap'
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
  const content = `${profile.author} - ${profile.score}pts - [dotheyhate.us](dotheyhate.us/${profile.author})
  ${submission.url}`

  await axios.post(DISCORD_WEBHOOK, { content }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
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

      if (!seen.includes(submission.id)) {
        const profile = await compileAuthor(submission.author)
        if (profile.score > 2000) {
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
