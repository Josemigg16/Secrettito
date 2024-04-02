/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/ban-types */
'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import PostBigCard from '@/components/BigCard'
import type { ExtendedPost } from '@/types'
import type { SetStateAction } from 'react'

export default function Page() {
  const [post, setPost] = useState({} as ExtendedPost)
  console.log(post)
  const pathname = usePathname()
  const [, postlink] = pathname.split('/')

  useEffect(() => {
    if (postlink) {
      const getPost = async () => {
        const res = await fetch(`/api/posts/${postlink}`)
        const post = (await res.json()) as SetStateAction<ExtendedPost>
        setPost(post)
      }
      void getPost()
    }
  }, [postlink])
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
