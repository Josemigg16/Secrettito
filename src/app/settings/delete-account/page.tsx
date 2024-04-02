'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'

export default function page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: session } = useSession()
  return (
    <>
      <article className='flex justify-between items-center'>
        <h3 className='text-2xl'>Borrar tu cuenta de secretito: </h3>
        <Button className="ml-4" size="lg" color="danger" onPress={onOpen} variant='ghost'>
          Borrar definitivamente
        </Button>
      </article>
      <Modal className="mb-12" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-red-600">
                Aviso importante!
              </ModalHeader>
              <ModalBody>
                <p>
                  Al borrar la cuenta, perderas todas tus publicaciones {''}
                  <strong>¿Estas seguro?</strong>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={async () => {
                    const res = await fetch(
                      `/api/delete-account/${session?.user?.email}`,
                      {
                        method: 'DELETE',
                      },
                    )
                    if (res.ok) {
                      await signOut({
                        callbackUrl: '/',
                      })
                    }
                  }}
                >
                  Delete Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
