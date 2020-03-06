import {
  COMMENTS_API,
  SUBMISSION_API,
  HATE_SUBS,
} from '../lib/bootstrap'
import { postReducer } from './reduce'
import axios from 'axios'

export interface Author {
  author: string
  comments: Spots[]
  submissions: Spots[]
  markdown: string
}

interface Spots {
  count: number
  subreddit: string
}

export const getPosts = async (author: string, api: string) => {
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

const authorToMarkdown = (profile: Omit<Author, 'markdown'>): string => {
  let content =  `| subreddit | comments |\n`
  content += `|--------|:-------:|\n`
  content += profile.comments.map(x => `|${x.subreddit}|${x.count}|`).join('\n')
  return content
}

export const fetchAuthor = async (author: string): Promise<Author> => {
  const comments = await getPosts(author, COMMENTS_API)
  const submissions = await getPosts(author, SUBMISSION_API)
  const markdown = authorToMarkdown({ author, comments, submissions })
  return { author, comments, submissions, markdown }
}
