import { AuthorRawPosts } from '../../src/types'
import { compileStats } from '../../src/lib/author'

describe('Author compiler', () => {
  it('should aggregate submissions and comments', () => {
    const raw: AuthorRawPosts = {
      comments: [
        {
          subreddit: 'videos',
          count: 3,
        },
        {
          subreddit: 'megaphones',
          count: 6,
        },
        {
          subreddit: 'dinosaurs',
          count: 9,
        }
      ],
      submissions: [
        {
          subreddit: 'videos',
          count: 7,
        },
        {
          subreddit: 'dinosaurs',
          count: 10,
        },
        {
          subreddit: 'submarines',
          count: 1,
        }
      ]
    }

    const stats = compileStats(raw)

    expect(stats).toStrictEqual([
      {
        subreddit: 'dinosaurs',
        comments: 9,
        submissions: 10,
      },
      {
        subreddit: 'videos',
        comments: 3,
        submissions: 7,
      },
      {
        subreddit: 'megaphones',
        comments: 6,
        submissions: 0
      },
      {
        subreddit: 'submarines',
        comments: 0,
        submissions: 1,
      }
    ])
  })
})
