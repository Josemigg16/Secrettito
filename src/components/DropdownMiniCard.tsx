import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import CreatePost from '@/components/CreatePost'
import { useInfoPostStore } from '@/stores/infoPostStore'
import { useCreatedStore } from '@/stores/createdStore'
import { usePostsStore } from '@/stores/postsStore'
import makeURL from '@/helpers/makeURL'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ExtendedPost } from '@/types'
interface Props {
  post: ExtendedPost
}

export default function DropdownMiniCard({ post }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [copied, setCopied] = useState(false)
  const setID = useInfoPostStore((state) => state.setID)
  const setTitle = useInfoPostStore((state) => state.setTitle)
  const setContent = useInfoPostStore((state) => state.setContent)
  const setCreated = useCreatedStore((state) => state.setCreated)
  const deletePostState = usePostsStore((state) => state.deletePost)
  const router = useRouter()
  const url = makeURL(post.url)

  const handleEdit = () => {
    setCreated(false)
    onOpen()
    setID(post?.id)
    setTitle(post?.title)
    setContent(post?.content ?? '')
  }
  const handleDelete = async () => {
    document.getElementById(`${post.id}`)?.classList.add('toRight')
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        deletePostState(post.id)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <article className="absolute right-2 top-2">
      <Dropdown>
        <DropdownTrigger>
          <Button size="sm" className="relative rounded-3xl bg-purple-950">
            <p className="absolute bottom-[.40rem] text-5xl text-white">...</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="item menu" variant="solid">
          <DropdownItem
            onPress={async () => {
              try {
                await navigator.clipboard.writeText(url)
                setTimeout(() => {
                  setCopied(false)
                }, 1000)
                setCopied(true)
              } catch (error) {
                console.error('No se pudo copiar al portapapeles')
              }
            }}
          >
            {!copied ? 'Copiar' : 'Copiado'}
          </DropdownItem>
          <DropdownItem
            onPress={async () => {
              await navigator.share({
                title: post?.title,
                text: post?.content ? post.content : '',
                url,
              })
            }}
          >
            Compartir
          </DropdownItem>
          <DropdownItem onPress={() => router.push(`/${post.url}`)}>
            Ir al post
          </DropdownItem>
          <DropdownItem onPress={handleEdit}>Editar</DropdownItem>
          <DropdownItem
            onPress={async () => {
              await handleDelete()
            }}
            className="text-red-600"
            color="danger"
          >
            Borrar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <CreatePost
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </article>
  )
}
