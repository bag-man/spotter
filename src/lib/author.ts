import {
  COMMENTS_API,
  SUBMISSION_API,
  HATE_SUBS,
} from '../lib/bootstrap'
import { postReducer } from './reduce'
import axios from 'axios'
import {
  Author,
  AuthorPosts,
  AuthorStats,
  AuthorComment,
  Post,
  AuthorSubmission
} from '../types'

export const compileAuthor = async (author: string, subreddit?: string): Promise<Author> => {
  const raw = await fetchRawPosts(author, subreddit)
  const comments = subreddit ? compileComments(raw.comments) : []
  const submissions = subreddit ? compileSubmissions(raw.submissions) : []

  const stats = await compileStats(raw)
  const markdown = compileMarkdown(stats)
  const profile = { author, stats, markdown, submissions, comments }

  return profile
}

const getPosts = async (author: string, api: string, subreddit?: string): Promise<Post[]> => {
  const posts = []
  let before = Math.round(new Date().getTime() / 1000)

  while (!(posts.length % 1000)) {
    posts.push(...(await axios.get(api, {
      params: {
        subreddit: subreddit || HATE_SUBS.toString(),
        size: 1000,
        author,
        before
      }
    })).data.data)

    if (!posts.length || posts.length > 9999) break
    before = posts[posts.length-1].created_utc
  }

  return posts
}

export const compileComments = (raw: Post[] = []): AuthorComment[] => {
  return raw.map(x => ({
    body: x.body || 'No body found',
    date: new Date(x.created_utc * 1000),
    link: x.permalink
  }))
}

export const compileSubmissions = (raw: Post[] = []): AuthorSubmission[] => {
  return raw.map(x => ({
    title: x.title || 'No title found',
    date: new Date(x.created_utc * 1000),
    link: x.permalink
  }))
}

export const compileStats = async (posts: AuthorPosts): Promise<AuthorStats[]> => {
  const reducedComments = posts.comments.length ? await postReducer(posts.comments) : []
  const reducedSubmissions = posts.submissions.length ? await postReducer(posts.submissions) : []

  const comments: AuthorStats[] = reducedComments.map(x =>
    ({ subreddit: x.subreddit, comments: x.count, submissions: 0 })
  )

  const submissions: AuthorStats[] = reducedSubmissions.map(x =>
    ({ subreddit: x.subreddit, submissions: x.count, comments: 0 })
  )

  submissions.forEach(n => {
    const subreddit = comments.find(x => x.subreddit === n.subreddit)

    if (subreddit) {
      subreddit.submissions = n.submissions
    } else {
      comments.push(n)
    }
  })

  return comments.sort((a,b) => (a.comments + a.submissions < b.comments + b.submissions) ? 1 : -1)
}

const compileMarkdown = (stats: AuthorStats[]): string => {
  let markdown =  `| subreddit | comments | submissions |\n`
  markdown += `|--------|:-------:|:-------:|\n`
  markdown += stats.map(x => `|${x.subreddit}|${x.comments}|${x.submissions}`).join('\n')
  return markdown
}

const fetchRawPosts = async (author: string, subreddit?: string): Promise<AuthorPosts> => {
  const comments = await getPosts(author, COMMENTS_API, subreddit)
  const submissions = await getPosts(author, SUBMISSION_API, subreddit)
  return { comments, submissions }
}
