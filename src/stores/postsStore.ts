import { create } from 'zustand'
import type { ExtendedPost } from '@/types'

interface postsState {
  posts: ExtendedPost[]
  setPosts: (posts: ExtendedPost[]) => void
  deletePost: (id: string) => void
}

export const usePostsStore = create<postsState>()((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
}))
