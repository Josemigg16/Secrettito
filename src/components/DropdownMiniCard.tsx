import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'

export default function DropdownMiniCard() {
  return (
    <article className="absolute right-2 top-2">
      <Dropdown>
        <DropdownTrigger className="">
          <Button size="sm" className="relative bg-purple-950 rounded-3xl">
            <p className="absolute bottom-[.40rem] text-5xl text-white">...</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="solid">
          <DropdownItem>Editar</DropdownItem>
          <DropdownItem className="text-red-600" color="danger">
            Borrar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </article>
  )
}
