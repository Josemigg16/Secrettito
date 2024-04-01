"use client"
import { useSession } from "next-auth/react"
import useChooseLanguage from "../hooks/useChooseLang"
import Header from "@/components/Header"
import CreatePost from "@/components/CreatePost"
import NextUICard from "@/components/postMiniCard"
import { BarlowCondensed } from "@/fonts/fonts"
import { useEffect, useState } from "react"
import type { Post } from "@prisma/client"

export default function Page() {
  const [created, setCreated] = useState(false)
  const [posts, setPosts] = useState([])
  const { dict, setLang, ChooseLanguage } = useChooseLanguage({})
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const getPosts = async () => {
        const res = await fetch(`/api/users/${session?.user?.email}/posts`)
        const data = await res.json()
        setPosts(data)
      }
      getPosts()
    }
  }, [session, created])

  return (
    <main
      className={`${BarlowCondensed.className} h-screen bg-ig overflow-hidden`}
    >
      <Header setLang={setLang} ChooseLanguage={ChooseLanguage} session={session} />
      <section className="mt-6 grid grid-cols-4 px-10">
        <article className="col-start-1 col-end-4">
          Mensajes de la publicacion
        </article>
        <ul className="px-6 space-y-4 overflow-y-auto max-h-[46em] max-w-[450px]">
          <CreatePost
            session={session}
            created={created}
            setCreated={setCreated}
          />
          {posts.map((post: Post) => (
            <NextUICard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              authorId={post.authorId}
              link={post.link}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
