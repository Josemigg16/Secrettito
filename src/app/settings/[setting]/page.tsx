'use client'
import { signOut, useSession } from 'next-auth/react'
import Header from '@/components/Header'
import Link from 'next/link'
import Account from '@public/icons/Account'
import Trash from '@public/icons/Trash'
import { BarlowCondensed } from '@/fonts/fonts'
import {
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const path = usePathname()
  const { data: session } = useSession()

  return (
    <main
      className={`${BarlowCondensed.className} bg-ig h-screen overflow-y-hidden`}
    >
      <Header />
      <section className="flex h-5/6 items-center overflow-y-hidden">
        <div className="mx-auto h-5/6 w-5/6 min-w-72 max-w-[720px] rounded bg-white">
          <h2 className="pl-8 pt-8 text-5xl font-bold">Configuración</h2>
          <div className="grid h-full grid-cols-12 rounded">
            <article className="col-start-1 col-end-11 w-full p-6 text-3xl">
              <section>
                {path === '/settings/account' ? (
                  <>
                    <p className="mt-4 text-lg">
                      Nombre: {session?.user?.name}
                    </p>
                    <p className="mt-4 text-lg">
                      Email: {session?.user?.email}
                    </p>
                  </>
                ) : (
                  ''
                )}

                {path === '/settings/delete-account' ? (
                  <>
                    <Button
                      className="ml-4"
                      size="lg"
                      color="danger"
                      onPress={onOpen}
                    >
                      Borrar definitivamente
                    </Button>
                    <Modal
                      className="mb-12"
                      isOpen={isOpen}
                      onOpenChange={onOpenChange}
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1 text-red-600">
                              Aviso importante!
                            </ModalHeader>
                            <ModalBody>
                              <p>
                                Al borrar la cuenta, perderas todas tus
                                publicaciones {''}
                                <strong>¿Estas seguro?</strong>
                              </p>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="primary"
                                variant="light"
                                onPress={onClose}
                              >
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
                ) : (
                  ''
                )}
              </section>
            </article>
            <aside className="col-start-11 col-end-13 w-full pr-6">
              <ul className="mt-10 w-full">
                <Link
                  href="/settings/account"
                  className="relative block h-10 w-full py-2"
                >
                  <Account className="mx-auto md:hidden" />
                  <p className="hidden w-full text-center md:block">Profile</p>
                </Link>
                <Divider />
                <Link
                  href="/settings/delete-account"
                  className="block w-full py-2 text-center"
                >
                  <Trash className="mx-auto md:hidden" />
                  <p className="hidden text-red-500 md:inline">
                    Delete Account
                  </p>
                </Link>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
