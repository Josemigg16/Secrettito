"use client"
import { useSession } from "next-auth/react"
import useChooseLanguage from "../../hooks/useChooseLang"
import Header from "@/components/Header"
import Link from "next/link"
import Account from "@public/icons/Account"
import Trash from "@public/icons/Trash"
import { BarlowCondensed } from "@/fonts/fonts"
import { Divider, button } from "@nextui-org/react"
import { usePathname } from "next/navigation"

export default function Page() {
  const { dict, setLang, ChooseLanguage } = useChooseLanguage({})
  const path = usePathname()
  const { data: session } = useSession()

  return (
    <main
      className={`${BarlowCondensed.className} h-screen bg-ig overflow-y-hidden`}
    >
      <Header setLang={setLang} ChooseLanguage={ChooseLanguage} />
      <section className="h-5/6 flex items-center overflow-y-auto">
        <div className="w-5/6 max-w-[720px] min-w-80 mx-auto rounded bg-white h-5/6 grid grid-cols-12">
          <article className="w-full col-start-1 col-end-11 p-6 font-bold text-3xl rounded">
            <h2 className="ml-12">Configuración</h2>
            <section>
              {path === "/settings/account" ? (
                <p className="mt-4 text-lg">Nombre: {session?.user?.name}</p>
              ) : (
                ""
              )}

              {path === "/settings/delete-account" ? (
                <>
                  <h3>Delete your Account</h3>
                </>
              ) : (
                ""
              )}
            </section>
          </article>
          <aside className="w-full col-start-11 col-end-13 pr-6">
            <ul className="mt-4 w-full">
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
                <p className="md:inline hidden text-red-500">Delete Account</p>
              </Link>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  )
}
