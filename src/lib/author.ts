import {
  COMMENTS_API,
  SUBMISSION_API,
  HATE_SUBS,
  HATE_WORDS,
  hateRegex,
} from '../lib/bootstrap'
import { postReducer } from './reduce'
import axios from 'axios'
import {
  Author,
  AuthorPosts,
  AuthorStats,
  AuthorComment,
  Post,
  AuthorSubmission,
  PushshiftParams,
  AuthorWord
} from '../types'

export const compileAuthor = async (author: string, subreddit?: string): Promise<Author> => {
  const raw = await fetchRawPosts(author, subreddit)
  const rawWords = await getPosts(author, COMMENTS_API, true)

  const comments = subreddit ? compileComments(raw.comments) : []
  const submissions = subreddit ? compileSubmissions(raw.submissions) : []
  const words = compileWords(rawWords)

  const stats = await compileStats(raw)
  const markdown = compileMarkdown(stats, words)
  const profile = { author, stats, markdown, submissions, comments, words }

  return profile
}

export const compileAuthorWord = async (author: string, word: string): Promise<Partial<Author>> => {
  const rawWords = await getWord(author, word)
  const words = compileWords(rawWords)
  const comments = compileComments(rawWords) || []

  const profile = { author, comments, words }

  return profile
}

const getWord = async (author: string, word: string): Promise<Post[]> => {
  const posts = []
  let before = Math.round(new Date().getTime() / 1000)


  while (!(posts.length % 1000)) {
    const params: PushshiftParams = {
      size: 1000,
      author,
      q: `"${word}"`,
      before
    }

    posts.push(...(await axios.get(COMMENTS_API, { params })).data.data)

    if (!posts.length || posts.length > 9999) break
    before = posts[posts.length-1].created_utc
  }

  return posts
}

const getPosts = async (author: string, api: string, words: boolean, subreddit?: string): Promise<Post[]> => {
  const posts = []
  let before = Math.round(new Date().getTime() / 1000)


  while (!(posts.length % 1000)) {
    const params: PushshiftParams = {
      subreddit: subreddit || HATE_SUBS.toString(),
      size: 1000,
      author,
      before
    }

    if (words) {
      delete params.subreddit
      params.q = HATE_WORDS.map(word => `"${word}"`).join('|')
    }

    posts.push(...(await axios.get(api, { params })).data.data)

    if (!posts.length || posts.length > 9999) break
    before = posts[posts.length-1].created_utc
  }

  return posts
}

const compileWords = (raw: Post[]): AuthorWord[] => {
  if (!raw.length) {
    return []
  }

  return HATE_WORDS.map(word => ({
    // eslint-disable-next-line
    count: raw.filter(x => x.body!.includes(word)).length,
    word
  })).sort((a,b) => (a.count < b.count) ? 1 : -1).filter(x => x.count !== 0)
}

export const compileComments = (raw: Post[] = []): AuthorComment[] => {
  return raw.map(x => ({
    subreddit: x.subreddit,
    body: x.body!.replace(hateRegex, `<span class='highlight'>$&</span>`) || 'No body found',
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

const compileMarkdown = (stats: AuthorStats[], words: AuthorWord[]): string => {
  let markdown =  `| subreddit | comments | submissions |\n`
  markdown += `|--------|:-------:|:-------:|\n`
  markdown += stats.map(x => `|${x.subreddit}|${x.comments}|${x.submissions}`).join('\n')
  markdown += `\n`
  markdown += `\n`
  markdown += `| word | used |\n`
  markdown += `|--------|:-------:|\n`
  markdown += words.map(x => `|${x.word}|${x.count}`).join('\n')
  return markdown
}

const fetchRawPosts = async (author: string, subreddit?: string): Promise<AuthorPosts> => {
  const comments = await getPosts(author, COMMENTS_API, false, subreddit)
  const submissions = await getPosts(author, SUBMISSION_API, false, subreddit)
  return { comments, submissions }
}
