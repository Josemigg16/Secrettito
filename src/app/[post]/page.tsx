"use client"
import Header from "@/components/Header"
import useChooseLanguage from "../hooks/useChooseLang"
import { useSession } from "next-auth/react"
import { BarlowCondensed } from "@/fonts/fonts"
import NextUICard from "@/components/postMiniCard"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import PostBigCard from "@/components/postBigCard"
import type { ExtendedPost } from "@/types"

export default function Page({}) {
  const { setLang, dict, ChooseLanguage } = useChooseLanguage({
    registerMessage: "",
    signInWithIg: "",
    signInWithGg: "",
  })
  const [post, setPost] = useState({} as ExtendedPost)
  console.log(post)
  const pathname = usePathname()
  const [, postlink] = pathname.split("/")
  const { data: session } = useSession()

  useEffect(() => {
    if (postlink) {
      const getPost = async () => {
        const res = await fetch(`/api/posts/${postlink}`)
        const post = await res.json()
        setPost(post)
      }
      getPost()
    }
  }, [postlink])
  return (
    <main
      className={`${BarlowCondensed.className} bg-ig relative h-screen overflow-hidden`}
    >
      <Header
        setLang={setLang}
        ChooseLanguage={ChooseLanguage}
        session={session}
      />
      <article className="mx-auto w-[600px] mt-20">
        <PostBigCard
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
        />
      </article>
    </main>
  )
}
