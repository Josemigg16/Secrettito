'use client'
import { useSession } from 'next-auth/react'
import useChooseLanguage from '../hooks/useChooseLang'
import Header from '@/components/Header'
import CreatePost from '@/components/CreatePost'
import PostList from '@/components/PostList'
import { BarlowCondensed } from '@/fonts/fonts'
import { useState } from 'react'
import ShowPost from '@/components/ShowPost'

export default function Page() {
  const [created, setCreated] = useState(false)
  const { setLang, ChooseLanguage } = useChooseLanguage({})
  const { data: session } = useSession()

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
        <ShowPost session={session} />
        <ul className="col-start-6 col-end-9 mx-auto max-w-[450px] space-y-4 overflow-y-auto px-6 md:mx-0">
          <CreatePost
            session={session}
            created={created}
            setCreated={setCreated}
          />
          <PostList
            session={session}
            created={created}
            setCreated={setCreated}
          />
        </ul>
      </section>
    </main>
  )
}
