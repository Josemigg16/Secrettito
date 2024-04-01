import makeURL from '@/helpers/makeURL'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Spinner
} from '@nextui-org/react'
import { type Session } from 'next-auth'
import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import ToClipboard from '@public/icons/ToClipboard'
import Share from '@public/icons/Share'

interface CreatePostProps {
  classname?: string
  session: Session | null
  created: boolean
  setCreated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePost ({
  classname,
  session,
  created,
  setCreated
}: CreatePostProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
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
    if (!content) {
      setInvalidTextarea(true)
      return
    }
    setCreating(true)
    const res = await fetch('/api/create-post', {
      method: 'POST',
      body: JSON.stringify({ title, content, email })
    })
    const postLink = await res.json() as string
    setCreating(false)
    setURL(makeURL(postLink))
    setCreated(true)
  }

  return (
    <>
      <Button
        variant="bordered"
        className="rounded-2xl w-full text-2xl h-36 text-white"
        onPress={onOpen}
      >
        Crear nueva publicacion
      </Button>
      <Modal
        className="absolute top-24 w-10/12 min-h-[392px]"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl pt-6">
                {created ? 'Publicación creada!' : 'Nueva publicación'}
              </ModalHeader>
              {creating
                ? (
                <>
                  <Spinner color="default" className="h-[260px]" />
                </>
                  )
                : (
                <ModalBody>
                  {!created
                    ? (
                    <form onSubmit={handleSubmit} className="space-y-6 pb-12">
                      <Input
                        value={title}
                        label="Título"
                        onChange={(e) => { setTitle(e.target.value) }}
                      />
                      <Textarea
                        isInvalid={invalidTextarea}
                        errorMessage={
                          invalidTextarea ? 'Debe llenar este campo' : ''
                        }
                        value={content}
                        maxLength={150}
                        label="Contenido"
                        onChange={(e) => { setContent(e.target.value) }}
                      />
                    </form>
                      )
                    : (
                    <>
                      <article>
                        <h3 className="text-lg">
                          <strong>Título</strong>: {title}
                        </h3>
                        <strong>Contenido</strong>:
                        <p className="overflow-auto">{content}</p>
                        <p className="flex flex-wrap mt-6">
                          <strong className="mr-2">Ir:</strong>
                          <Link className="hover:underline" href={url}>
                            {url}
                          </Link>
                        </p>
                        <footer className="flex flex-col gap-2 mt-3">
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
                      ? async () => { await handleSubmit(null) }
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
    </>
  )
}
