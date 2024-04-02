'use client'
import { useSession } from 'next-auth/react'
import useChooseLanguage from '../hooks/useChooseLang'
import { Button, useDisclosure } from '@nextui-org/react'
import Header from '@/components/Header'
import CreatePost from '@/components/CreatePost'
import PostList from '@/components/PostList'
import ShowPost from '@/components/ShowPost'
import { BarlowCondensed } from '@/fonts/fonts'

export default function Page() {
  const { setLang, ChooseLanguage } = useChooseLanguage({})
  const { data: session } = useSession()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <main
      className={`${BarlowCondensed.className} bg-ig h-screen overflow-hidden`}
    >
      <Header
        setLang={setLang}
        ChooseLanguage={ChooseLanguage}
        session={session}
      />
      <section className="mt-6 block h-[75%] grid-cols-8 md:mt-20 md:grid md:px-10">
        <ShowPost session={session} />
        <ul className="col-start-6 col-end-9 mx-auto max-w-[450px] space-y-4 overflow-y-auto px-6 md:mx-0">
          <Button
            variant="bordered"
            className="mt-4 h-40 w-full rounded-2xl text-3xl text-white hover:scale-105"
            onPress={onOpen}
          >
            Crear nueva publicacion
          </Button>
          <CreatePost
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          />
          <PostList />
        </ul>
      </section>
    </main>
  )
}
