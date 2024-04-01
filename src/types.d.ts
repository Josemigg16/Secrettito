import type { Post, Message } from "@prisma/client"

export interface ExtendedPost extends Post {
  author: User
  authorId?: string
  link?: string
}

export interface ExtenderedPost extends Post {
  author: User
  authorId?: string
  link?: string
  messages: Message[]
}
