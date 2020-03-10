export interface ParsedComment {
  author: string
  subreddit: string
  count: number
}

export interface PostStat {
  subreddit: string
  count: number
}

export interface Author {
  author: string
  markdown: string
  comments: AuthorComment[]
  submissions: AuthorSubmission[]
  stats: AuthorStats[]
}

export interface AuthorPosts {
  comments: Post[]
  submissions: Post[]
}

export interface Spots {
  count: number
  subreddit: string
}

export interface AuthorStats {
  subreddit: string
  submissions: number
  comments: number
}

export interface AuthorActivityBySubreddit {
  subreddit: string
  author: string
  comments: AuthorComment[]
  submissions: AuthorSubmission[]
  stats: Spots[]
}

export interface Post {
  author: string
  subreddit: string
  title?: string
  body?: string
  permalink?: string
  // eslint-disable-next-line
  created_utc: number
  count: number
}

export interface AuthorComment {
  body: string
  date: Date
  link?: string
}

export interface AuthorSubmission {
  title: string
  date: Date
  link?: string
}
