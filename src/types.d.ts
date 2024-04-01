import type { Post } from "@prisma/client"

export interface ExtendedPost extends Post {
  author: User
  authorId?: string
  link?: string
}
