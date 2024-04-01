"use client"
import { useSession } from "next-auth/react"
import useChooseLanguage from "../hooks/useChooseLang"
import Header from "@/components/Header"
import CreatePost from "@/components/CreatePost"
import PostMiniCard from "@/components/MiniCard"
import { BarlowCondensed } from "@/fonts/fonts"
import { useEffect, useState } from "react"
import type { ExtendedPost } from "@/types"
import type { SetStateAction } from "react"

export default function Page() {
  const [created, setCreated] = useState(false)
  const [posts, setPosts] = useState([])
  const { setLang, ChooseLanguage } = useChooseLanguage({})
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const getPosts = async () => {
        const res = await fetch(`/api/users/${session?.user?.email}/posts`)
        const data = (await res.json()) as SetStateAction<never[]>
        setPosts(data)
      }
      void getPosts()
    }
  }, [session, created])

  return (
    <main
      className={`${BarlowCondensed.className} bg-ig h-screen overflow-hidden`}
    >
      <Header
        setLang={setLang}
        ChooseLanguage={ChooseLanguage}
        session={session}
      />
      <section className="mt-6 block h-[75%] grid-cols-8 md:grid md:px-10">
        <article className="col-start-2 col-end-6 hidden items-center justify-center rounded-xl border-2 border-dashed border-gray-200 md:flex">
          <h2 className="h-fit select-none text-center text-6xl text-gray-200">
            Haz click en una publicacion para verla
          </h2>
        </article>
        <ul className="col-start-6 col-end-9 mx-auto max-w-[450px] space-y-4 overflow-y-auto px-6 md:mx-0">
          <CreatePost
            session={session}
            created={created}
            setCreated={setCreated}
          />
          {posts?.map((post: ExtendedPost) => (
            <PostMiniCard key={post.id} post={post} />
          ))}
        </ul>
      </section>
    </main>
  )
}
