import { useEffect, useState } from 'react'
import PostMiniCard from '@/components/MiniCard'
import type { ExtendedPost } from '@/types'
import { useSession } from 'next-auth/react'
import { useCreatedStore } from '@/stores/createdStore'
import SkeletonPost from './SkeletonPost'
import { usePostsStore } from '@/stores/postsStore'

export default function PostList() {
  const posts = usePostsStore((state) => state.posts)
  const setPosts = usePostsStore((state) => state.setPosts)
  const { data: session } = useSession()
  const [fetching, setFetching] = useState(true)
  const created = useCreatedStore((state) => state.created)

  useEffect(() => {
    setFetching(true)
    if (session) {
      const getPosts = async () => {
        const res = await fetch(`/api/users/${session?.user?.email}/posts`)
        const data = (await res.json()) as ExtendedPost[]
        void setPosts(data)
        setFetching(false)
      }
      void getPosts()
    }
  }, [session, created])

  return (
    <>
      {Array.isArray(posts) &&
        posts?.map((post: ExtendedPost) => (
          <PostMiniCard key={post.id} post={post} />
        ))}

      {fetching && (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      )}
    </>
  )
}
