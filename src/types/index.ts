export interface ParsedComment {
  author: string
  subreddit: string
  count: number
}

export interface ParsedAuthor {
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
