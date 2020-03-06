import {
  COMMENTS_API,
  SUBMISSION_API,
  HATE_SUBS,
} from '../lib/bootstrap'
import { postReducer } from './reduce'
import axios from 'axios'
import { Author, AuthorRawPosts, PostsBySubreddit } from '../types'

export const compileAuthor = async (author: string): Promise<Author> => {
  const raw = await fetchRawPosts(author)
  const stats = compileStats(raw)
  const markdown = compileMarkdown(stats)
  return { author, stats, markdown }
}

const getPosts = async (author: string, api: string) => {
  let posts = []
  let before = Math.round(new Date().getTime() / 1000)

  while (!(posts.length % 1000)) {
    posts.push(...(await axios.get(api, {
      params: {
        subreddit: HATE_SUBS.toString(),
        size: 1000,
        author,
        before
      }
    })).data.data)

    if (!posts.length) break
    before = posts[posts.length-1].created_utc
  }

  if (posts.length) {
    posts = postReducer(posts)
  }

  return posts
}

export const compileStats = (raw: AuthorRawPosts): PostsBySubreddit[] => {
  const posts: PostsBySubreddit[] = raw.comments.map(x =>
    ({ subreddit: x.subreddit, comments: x.count, submissions: 0 })
  )

  const submissions: PostsBySubreddit[] = raw.submissions.map(x =>
    ({ subreddit: x.subreddit, submissions: x.count, comments: 0 })
  )

  submissions.forEach(n => {
    const subreddit = posts.find(x => x.subreddit === n.subreddit)
    if (subreddit)
    {subreddit.submissions = n.submissions}
    else
    {posts.push(n)}
  })

  return posts.sort((a,b) => (a.comments + a.submissions < b.comments + b.submissions) ? 1 : -1)
}

const compileMarkdown = (stats: PostsBySubreddit[]): string => {
  let markdown =  `| subreddit | comments | submissions |\n`
  markdown += `|--------|:-------:|:-------:|\n`
  markdown += stats.map(x => `|${x.subreddit}|${x.comments}|${x.submissions}`).join('\n')
  return markdown
}

const fetchRawPosts = async (author: string): Promise<AuthorRawPosts> => {
  const comments = await getPosts(author, COMMENTS_API)
  const submissions = await getPosts(author, SUBMISSION_API)
  return { comments, submissions }
}
