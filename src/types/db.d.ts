import type { Post, Subboard, User, Vote, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  subboard: Subboard
  votes: Vote[]
  author: User
  comments: Comment[]
}
