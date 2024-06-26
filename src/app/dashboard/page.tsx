'use client'
import { useSession } from 'next-auth/react'
import { Button, useDisclosure } from '@nextui-org/react'
import CreatePost from '@/components/CreatePost'
import PostList from '@/components/PostList'
import ShowPost from '@/components/ShowPost'
import { useInfoPostStore } from '@/stores/infoPostStore'

export default function Page() {
  const { data: session } = useSession()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const setPostID = useInfoPostStore((state) => state.setID)

  return (
    <section className="mt-6 block h-[75%] grid-cols-8 overflow-y-auto md:mt-20 md:grid md:px-10">
      <ShowPost session={session} />
      <ul className="col-start-6 col-end-9 mx-auto max-w-[450px] space-y-4 overflow-y-auto px-6 md:mx-0">
        <Button
          variant="light"
          className="mt-4 h-40 w-full rounded-2xl border-2 border-slate-200 text-3xl text-white hover:scale-105"
          onPress={() => {
            onOpen()
            setPostID('')
          }}
        >
          <p className="text-wrap">Crear nueva publicacion</p>
        </Button>
        <CreatePost
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
        <PostList />
      </ul>
    </section>
  )
}
