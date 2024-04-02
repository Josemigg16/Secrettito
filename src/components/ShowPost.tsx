/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Session } from 'next-auth'
import type { ExtenderedPost } from '@/types'

interface Props {
  session: Session | null
}

export default function ShowPost({ session }: Props) {
  const searchParams = useSearchParams()
  const url = searchParams.get('post')
  const [post, setPost] = useState({} as ExtenderedPost)
  console.log(url)

  useEffect(() => {
    if (session) {
      const getPost = async () => {
        const res = await fetch(`/api/posts/${url}`)
        const post = (await res.json()) as ExtenderedPost
        setPost(post)
      }
      void getPost()
    }
  }, [session, url])

  return (
    <>
      {!url ? (
        <article className="col-start-2 col-end-6 hidden items-center justify-center rounded-xl border-2 border-dashed border-gray-200 md:flex">
          <h2 className="h-fit select-none text-center text-6xl text-gray-200">
            Haz click en una publicacion para verla
          </h2>
        </article>
      ) : (
        <article className="col-start-2 col-end-6 mr-20 hidden rounded-xl border-2 border-dashed border-gray-200 md:block md:border-none">
          <header className="mb-12 flex justify-between text-7xl text-gray-200">
            Mensajes:
          </header>
          {post?.messages?.map((message) => (
            <article
              className="mt-4 rounded-xl bg-white p-6 text-2xl"
              key={message.id}
            >
              <p key={message?.id}>{message?.content}</p>
            </article>
          ))}
        </article>
      )}
    </>
  )
}
