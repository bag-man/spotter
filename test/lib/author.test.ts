import { compileStats } from '../../src/lib/author'
import { AuthorPosts } from '../../src/types'

describe('Author compiler', () => {
  it('should aggregate submissions and comments', async () => {
    const raw = {
      comments: [
        {
          subreddit: 'videos',
        },
        {
          subreddit: 'megaphones',
        },
        {
          subreddit: 'megaphones',
        },
        {
          subreddit: 'dinosaurs',
        },
        {
          subreddit: 'dinosaurs',
        },
        {
          subreddit: 'dinosaurs',
        },
        {
          subreddit: 'dinosaurs',
        }
      ],
      submissions: [
        {
          subreddit: 'videos',
        },
        {
          subreddit: 'videos',
        },
        {
          subreddit: 'videos',
        },
        {
          subreddit: 'videos',
        },
        {
          subreddit: 'dinosaurs',
        },
        {
          subreddit: 'dinosaurs',
        },
        {
          subreddit: 'dinosaurs',
        },
        {
          subreddit: 'submarines',
        },
        {
          subreddit: 'submarines',
        },
      ]
    }

    const stats = await compileStats(raw as AuthorPosts)

    expect(stats).toStrictEqual([
      {
        subreddit: 'dinosaurs',
        comments: 4,
        submissions: 3,
      },
      {
        subreddit: 'videos',
        comments: 1,
        submissions: 4,
      },
      {
        subreddit: 'megaphones',
        comments: 2,
        submissions: 0
      },
      {
        subreddit: 'submarines',
        comments: 0,
        submissions: 2,
      },
    ])
  })
})
