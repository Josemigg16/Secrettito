import { useEffect, useState } from 'react'
import PostMiniCard from '@/components/MiniCard'
import type { ExtendedPost } from '@/types'
import type { SetStateAction } from 'react'
import { useSession } from 'next-auth/react'
import { useCreatedStore } from '@/stores/createdStore'
import SkeletonPost from './SkeletonPost'

export default function PostList() {
  const [posts, setPosts] = useState([])
  const { data: session } = useSession()
  const [fetching, setFetching] = useState(true)
  const created = useCreatedStore((state) => state.created)

  useEffect(() => {
    setFetching(true)
    if (session) {
      const getPosts = async () => {
        const res = await fetch(`/api/users/${session?.user?.email}/posts`)
        const data = (await res.json()) as SetStateAction<never[]>
        setPosts(data)
        setFetching(false)
      }
      void getPosts()
    }
  }, [session, created])

  return (
    <>
      {!fetching && posts.length > 0 ? (
        posts?.map((post: ExtendedPost) => (
          <PostMiniCard key={post.id} post={post} />
        ))
      ) : (
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
