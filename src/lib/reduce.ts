import { ParsedComment, ParsedAuthor } from "../types"
import { BOTS } from "./bootstrap"

type RecursiveFn<T> = (xs: T[], out?: T[]) => T[]
type OperatorFn<T> = (T: T, xs: T[], out: T[]) => T | void
type FactoryFn = <T>(fn: OperatorFn<T>) => RecursiveFn<T>

const recursiveFactory: FactoryFn = <T>(fn: OperatorFn<T>) => {
  const recursive: RecursiveFn<T> = (xs, out = [])  => {
    const x = xs.shift()

    // eslint-disable-next-line
    const res = fn(x!, xs, out)

    if (res) {
      out.push(res)
    }

    if (xs.length) {
      return recursive(xs, out)
    }

    return out
  }

  return recursive
}

const reduceComments: OperatorFn<ParsedComment> = (x, _xs, out) => {
  if (BOTS.find(n => n === x.author)) {
    return
  }

  const exist = out.find(n => n.subreddit === x.subreddit && n.author === x.author)

  if (exist) {
    exist.count++
    return
  }

  x.count = 1
  return x
}

const reduceAuthor: OperatorFn<ParsedAuthor> = (x, _xs, out) => {
  const exist = out.find(n => n.subreddit === x.subreddit)

  if (exist) {
    exist.count++
    return
  }

  return { count: 1, subreddit: x.subreddit }
}

export const commentReducer = recursiveFactory<ParsedComment>(reduceComments)
export const authorReducer = recursiveFactory<ParsedAuthor>(reduceAuthor)
