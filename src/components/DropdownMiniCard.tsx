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
import type { ExtendedPost } from '@/types'
interface Props {
  post: ExtendedPost
}

export default function DropdownMiniCard({ post }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const setID = useInfoPostStore((state) => state.setID)
  const setTitle = useInfoPostStore((state) => state.setTitle)
  const setContent = useInfoPostStore((state) => state.setContent)

  const handleEdit = () => {
    onOpen()
    setID(post?.id)
    setTitle(post?.title)
    setContent(post?.content ?? '')
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
          <DropdownItem onPress={handleEdit}>Editar</DropdownItem>
          <DropdownItem className="text-red-600" color="danger">
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
