import { credentials, subreddits, PUSHSHIFT_COMMENTS_API, hateSubs, PushShiftComment } from './bootstrap'
import axios from 'axios'
import RedditApi from 'reddit-ts'

const r = new RedditApi(credentials)

const main = async () => {
  // const comments = (await Promise.all(
  //   subreddits.map(subreddit => r.comments(subreddit))
  // )).flat().map(x =>
  //   ({ subreddit: x.subreddit, author: x.author, url: x.url })
  // )

  // console.log(comments)

  const badComments = await axios.get(PUSHSHIFT_COMMENTS_API, {
    params: {
      subreddit: hateSubs.toString(),
      size: 1000
    }
  });

  const authors = badComments.data.data.map((x: PushShiftComment) =>
    ({ author: x.author, subreddit: x.subreddit, permalink: x.permalink })
  )

  console.log(authors)
}

main()
