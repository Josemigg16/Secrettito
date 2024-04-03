/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/ban-types */
'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import PostBigCard from '@/components/BigCard'
import type { ExtendedPost } from '@/types'

export default function Page() {
  const [post, setPost] = useState({} as ExtendedPost)
  const pathname = usePathname()
  const [error, setError] = useState(false)
  const [, postlink] = pathname.split('/')
  const router = useRouter()

  useEffect(() => {
    if (postlink) {
      const getPost = async () => {
        const res = await fetch(`/api/posts/${postlink}`)
        const post = (await res.json()) as ExtendedPost
        setPost(post)
        if (!post.id) setError(true)
      }
      void getPost()
    }
  }, [postlink])

  useEffect(() => {
    if (error) router.push('/404')
  }, [error])
  return (
    <article className="mx-auto grid h-[68vh] w-5/6 min-w-72 max-w-[600px] content-center">
      <PostBigCard
        id={post.id}
        title={post.title}
        content={post.content}
        author={post.author}
        createdAt={post.createdAt}
      />
    </article>
  )
}
