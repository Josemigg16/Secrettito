/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Session } from 'next-auth'
import type { ExtenderedPost } from '@/types'
import QuitIcon from '@public/icons/Quit'

interface Props {
  session: Session | null
}

export default function ShowPost({ session }: Props) {
  const [post, setPost] = useState({} as ExtenderedPost)
  const searchParams = useSearchParams()
  const url = searchParams.get('post')
  const router = useRouter()

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

  const handleQuit = () => {
    const messages = document.querySelector('#messagesContainer')
    messages?.classList.add('toRight')
    setTimeout(() => {
      router.push('/dashboard?post=null')
    }, 200)
  }
  return (
    <>
      {url === 'null' || url === null ? (
        <article className="col-start-2 col-end-6 hidden items-center justify-center rounded-xl border-2 border-dashed border-gray-200 md:flex">
          <h2 className="h-fit select-none text-center text-6xl text-gray-200">
            Haz click en una publicacion para verla
          </h2>
        </article>
      ) : (
        <article
          className="absolute top-0 z-50 col-start-2 col-end-6 mr-20 h-screen w-screen overflow-y-auto bg-black bg-opacity-70 px-4 md:relative md:block md:h-auto md:w-auto md:border-none
        md:bg-transparent"
        >
          <button onClick={handleQuit}>
            <QuitIcon className="absolute right-4 top-12 cursor-pointer text-white md:hidden" />
          </button>
          <header className="mb-12 mt-8 flex justify-between text-7xl text-gray-200 md:mt-0">
            Mensajes:
          </header>
          <section id="messagesContainer">
            {post?.messages.length && (
              <h2 className="text-white text-opacity-80 text-4xl">
                Aún no hay mensajes para esta publicación
              </h2>
            )}
            {post?.messages?.map((message) => (
              <article
                className="fromRight mt-4 rounded-2xl bg-white p-4 text-2xl md:p-6 md:text-2xl"
                key={message.id}
              >
                <p key={message?.id} className="text-pretty break-all">
                  {message?.content}
                </p>
                <small className="flex select-none justify-end opacity-85">
                  {new Intl.DateTimeFormat('es-ES', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }).format(new Date(message?.createdAt as Date))}
                </small>
              </article>
            ))}
          </section>
        </article>
      )}
    </>
  )
}
