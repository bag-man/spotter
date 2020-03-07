export interface ParsedComment {
  author: string
  subreddit: string
  count: number
}

export interface ParsedPosts {
  subreddit: string
  count: number
}

export interface Author {
  author: string
  markdown: string
  stats: PostsBySubreddit[]
}

export interface AuthorRawPosts {
  comments: Spots[]
  submissions: Spots[]
}

export interface Spots {
  count: number
  subreddit: string
}

export interface PostsBySubreddit {
  subreddit: string
  submissions: number
  comments: number
}

export interface AuthorCommentsBySubreddit {
  subreddit: string
  author: string
  comments: AuthorComment[]
  stats: Spots[]
}

export interface Posts {
  stats: ParsedPosts[]
  posts?: Post[]
}

export interface Post {
  body: string
  permalink?: string
  // eslint-disable-next-line
  created_utc: number
}

export interface AuthorComment {
  body: string
  date: Date
  link?: string
}
