import type { Post, Message } from '@prisma/client'

export interface ExtendedPost extends Post {
  author: User
  authorId?: string
  url?: string
}

export interface ExtenderedPost extends Post {
  author: User
  authorId?: string
  url?: string
  messages: Message[]
}
