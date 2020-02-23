import {
  HATE_SUBS,
} from '../lib/bootstrap'
import { authorReducer } from './reduce'
import axios from 'axios'

export const getAuthor = async (author: string, api: string) => {
  let comments = []
  let before = Math.round(new Date().getTime() / 1000)

  while (!(comments.length % 1000)) {
    comments.push(...(await axios.get(api, {
      params: {
        subreddit: HATE_SUBS.toString(),
        size: 1000,
        author,
        before
      }
    })).data.data)

    if (!comments.length) break
    before = comments[comments.length-1].created_utc
  }

  if (comments.length) {
    comments = authorReducer(comments)
  }

  return comments
}

interface Spots {
  count: number
  subreddit: string
}

export interface Profile {
  author: string
  comments: Spots[]
  submissions: Spots[]
}
