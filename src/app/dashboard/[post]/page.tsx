"use client"
import { useSession } from "next-auth/react"
import useChooseLanguage from "../../hooks/useChooseLang"
import Header from "@/components/Header"
import CreatePost from "@/components/CreatePost"
import ShowPost from "@/components/ShowPost"
import PostMiniCard from "@/components/MiniCard"
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
      <Header
        setLang={setLang}
        ChooseLanguage={ChooseLanguage}
        session={session}
      />
      <section className="mt-6 block md:grid grid-cols-8 md:px-10 h-[75%]">
        <article className="col-start-2 col-end-6 border-gray-200 border-dashed border-2 rounded-xl hidden md:flex items-center justify-center">
          <ShowPost session={session} />
        </article>
        <ul className="col-start-6 col-end-9 px-6 space-y-4 overflow-y-auto max-w-[450px] mx-auto md:mx-0">
          <CreatePost
            session={session}
            created={created}
            setCreated={setCreated}
          />
          {posts?.map((post: Post) => (
            <PostMiniCard
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
