import { Profile } from "./author"

export const authorToMarkdown = (profile: Profile): string => {
  let content =  `| subreddit | comments |\n`
  content += `|--------|:-------:|\n`
  content += profile.comments.map(x => `|${x.subreddit}|${x.count}|`).join('\n')
  return content
}
