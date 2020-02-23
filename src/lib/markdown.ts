import { Profile } from "./author"

export const authorToMarkdown = (profile: Profile): string => {
  const headers =  `| subreddit | comments | submissions |`
  return headers
}
