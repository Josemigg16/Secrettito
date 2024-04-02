import makeURL from '@/helpers/makeURL'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Spinner,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import ToClipboard from '@public/icons/ToClipboard'
import Share from '@public/icons/Share'
import { useCreatedStore } from '@/stores/createdStore'
import { useInfoPostStore } from '@/stores/infoPostStore'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
}

export default function CreatePost({ isOpen, onOpenChange, onClose }: Props) {
  const created = useCreatedStore((state) => state.created)
  const setCreated = useCreatedStore((state) => state.setCreated)
  const { data: session } = useSession()
  const id = useInfoPostStore((state) => state.id)
  const title = useInfoPostStore((state) => state.title)
  const setTitle = useInfoPostStore((state) => state.setTitle)
  const content = useInfoPostStore((state) => state.content)
  const setContent = useInfoPostStore((state) => state.setContent)
  const [invalidTitle, setInvalidTitle] = useState(false)
  const [invalidTextarea, setInvalidTextarea] = useState(false)
  const [creating, setCreating] = useState(false)
  const [url, setURL] = useState('')
  const email = session?.user?.email

  const clearState = () => {
    setCreating(false)
    setTitle('')
    setContent('')
    setURL('')
    setInvalidTextarea(false)
  }

  const handleClose = () => {
    onClose()
    clearState()
    setCreated(false)
  }

  const handleSubmit = async (e: FormEvent | null) => {
    if (e) e.preventDefault()
    if (!title) {
      setInvalidTitle(true)
      return
    }
    if (!content) {
      setInvalidTextarea(true)
      return
    }
    setCreating(true)
    const res = await fetch('/api/create-post', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify({ title, content, email, id }),
    })
    const postLink = (await res.json()) as string
    setCreating(false)
    setURL(makeURL(postLink))
    setCreated(true)
  }

  return (
    <Modal
      className="absolute top-24 min-h-[392px] w-10/12 md:top-36 md:scale-150"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pt-6 text-xl">
              {created ? 'Publicación creada!' : 'Nueva publicación'}
            </ModalHeader>
            {creating ? (
              <>
                <Spinner color="default" className="h-[260px]" />
              </>
            ) : (
              <ModalBody>
                {!created ? (
                  <form onSubmit={handleSubmit} className="space-y-6 pb-12">
                    <Input
                      isInvalid={invalidTitle}
                      errorMessage={
                        invalidTitle ? 'Debe llenar este campo' : ''
                      }
                      value={title}
                      label="Título"
                      maxLength={15}
                      onChange={(e) => {
                        setTitle(e.target.value)
                      }}
                    />
                    <Textarea
                      isInvalid={invalidTextarea}
                      errorMessage={
                        invalidTextarea ? 'Debe llenar este campo' : ''
                      }
                      value={content}
                      maxLength={250}
                      label="Contenido"
                      onChange={(e) => {
                        setContent(e.target.value)
                      }}
                    />
                  </form>
                ) : (
                  <>
                    <article>
                      <h3 className="text-lg">
                        <strong>Título</strong>: {title}
                      </h3>
                      <strong>Contenido</strong>:
                      <p className="overflow-auto">{content}</p>
                      <p className="mt-6 flex flex-wrap">
                        <strong className="mr-2">Ir:</strong>
                        <Link className="hover:underline" href={url}>
                          {url}
                        </Link>
                      </p>
                      <footer className="mt-3 flex flex-col gap-2">
                        <Button>
                          <ToClipboard className="absolute left-6" />
                          Copiar
                        </Button>
                        <Button>
                          <Share className="absolute left-6" />
                          Compartir
                        </Button>
                      </footer>
                    </article>
                  </>
                )}
              </ModalBody>
            )}
            <ModalFooter>
              <Button
                isDisabled={creating}
                color="danger"
                variant="light"
                onPress={handleClose}
              >
                Close
              </Button>
              <Button
                isDisabled={creating}
                className="bg-ig hover:gradient-hover text-white"
                onPress={
                  !created
                    ? async () => {
                        await handleSubmit(null)
                      }
                    : () => {
                        clearState()
                        setCreated(false)
                      }
                }
              >
                Crear Nueva
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
