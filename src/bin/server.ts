import { credentials, subreddits } from './bootstrap'
import RedditApi from 'reddit-ts'

const r = new RedditApi(credentials)

const main = async () => {
  const comments = (await Promise.all(
    subreddits.map(subreddit => r.comments(subreddit))
  )).flat().map(x =>
    ({ subreddit: x.subreddit, author: x.author, url: x.url })
  )

  console.log(comments)
}

main()
