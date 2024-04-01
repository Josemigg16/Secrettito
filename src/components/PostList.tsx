import { useEffect, useState } from 'react'
import PostMiniCard from '@/components/MiniCard'
import type { ExtendedPost } from '@/types'
import { type Session } from 'next-auth'
import type { Dispatch, SetStateAction } from 'react'

interface Props {
  session: Session | null
  created: boolean
  setCreated: Dispatch<SetStateAction<boolean>>
}

export default function PostList ({ session, created, setCreated }: Props) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (session) {
      const getPosts = async () => {
        const res = await fetch(`/api/users/${session?.user?.email}/posts`)
        const data = await res.json() as SetStateAction<never[]>
        setPosts(data)
      }
      void getPosts()
    }
  }, [session, created])

  return (
    <>
    {posts?.map((post: ExtendedPost) => (
        <PostMiniCard
          key={post.id}
          post={post}
        />
    ))}
      </>
  )
}
