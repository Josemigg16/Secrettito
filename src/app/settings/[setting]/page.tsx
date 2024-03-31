"use client"
import { signOut, useSession } from "next-auth/react"
import useChooseLanguage from "../../hooks/useChooseLang"
import Header from "@/components/Header"
import Link from "next/link"
import Account from "@public/icons/Account"
import Trash from "@public/icons/Trash"
import { BarlowCondensed } from "@/fonts/fonts"
import {
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"
import { usePathname } from "next/navigation"

export default function Page() {
  const { dict, setLang, ChooseLanguage } = useChooseLanguage({})
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const path = usePathname()
  const { data: session } = useSession()

  return (
    <main
      className={`${BarlowCondensed.className} h-screen bg-ig overflow-y-hidden`}
    >
      <Header setLang={setLang} ChooseLanguage={ChooseLanguage} />
      <section className="h-5/6 flex items-center overflow-y-hidden">
        <div className="w-5/6 max-w-[720px] min-w-72 bg-white h-5/6 mx-auto rounded">
          <h2 className="text-5xl font-bold pl-8 pt-8">Configuración</h2>
          <div className=" rounded h-full grid grid-cols-12">
            <article className="w-full col-start-1 col-end-11 p-6 text-3xl">
              <section>
                {path === "/settings/account" ? (
                  <>
                    <p className="mt-4 text-lg">
                      Nombre: {session?.user?.name}
                    </p>
                    <p className="mt-4 text-lg">
                      Email: {session?.user?.email}
                    </p>
                  </>
                ) : (
                  ""
                )}

                {path === "/settings/delete-account" ? (
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
                                publicaciones {""}
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
                                      method: "DELETE",
                                    }
                                  )
                                  if (res.ok) signOut({
                                    callbackUrl: '/'
                                  })
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
                  ""
                )}
              </section>
            </article>
            <aside className="w-full col-start-11 col-end-13 pr-6">
              <ul className="mt-10 w-full">
                <Link
                  href="/settings/account"
                  className="block relative w-full h-10 hover:bg-green-600 py-2"
                >
                  <Account className="md:hidden mx-auto" />
                  <p className="md:block hidden w-full text-center">Profile</p>
                </Link>
                <Divider />
                <Link
                  href="/settings/delete-account"
                  className="block w-full text-center py-2"
                >
                  <Trash className="md:hidden mx-auto" />
                  <p className="md:inline hidden text-red-500">
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
