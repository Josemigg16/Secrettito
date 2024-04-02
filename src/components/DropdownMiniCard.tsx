import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import CreatePost from './CreatePost'

export default function DropdownMiniCard() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <article className="absolute right-2 top-2">
      <Dropdown>
        <DropdownTrigger className="">
          <Button size="sm" className="relative rounded-3xl bg-purple-950">
            <p className="absolute bottom-[.40rem] text-5xl text-white">...</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="solid">
          <DropdownItem onPress={onOpen}>Editar</DropdownItem>
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
