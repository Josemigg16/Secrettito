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
import type { ExtendedPost } from '@/types'
import { useRouter } from 'next/navigation'
interface Props {
  post: ExtendedPost
}

export default function DropdownMiniCard({ post }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const setID = useInfoPostStore((state) => state.setID)
  const setTitle = useInfoPostStore((state) => state.setTitle)
  const setContent = useInfoPostStore((state) => state.setContent)
  const setCreated = useCreatedStore((state) => state.setCreated)
  const router = useRouter()

  const handleEdit = () => {
    onOpen()
    setID(post?.id)
    setTitle(post?.title)
    setContent(post?.content ?? '')
  }
  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    })
    if (res.ok) setCreated(true)
  }

  return (
    <article className="absolute right-2 top-2">
      <Dropdown>
        <DropdownTrigger className="">
          <Button size="sm" className="relative rounded-3xl bg-purple-950">
            <p className="absolute bottom-[.40rem] text-5xl text-white">...</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="solid">
          <DropdownItem onPress={() => router.push(`/${post.url}`)}>
            Ir al post
          </DropdownItem>
          <DropdownItem onPress={handleEdit}>Editar</DropdownItem>
          <DropdownItem
            onPress={handleDelete}
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
