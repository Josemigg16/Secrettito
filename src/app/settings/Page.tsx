"use client"
import { useSession } from "next-auth/react"
import useChooseLanguage from "../hooks/useChooseLang"
import Header from "@/components/Header"
import Link from "next/link"
import Account from "@public/icons/Account"
import { BarlowCondensed } from "@/fonts/fonts"

export default function Page() {
  const { dict, setLang, ChooseLanguage } = useChooseLanguage({})
  const { data: session } = useSession()

  return (
    <main className={`${BarlowCondensed.className} h-screen bg-ig overflow-y-hidden`}>
      <Header setLang={setLang} ChooseLanguage={ChooseLanguage} />
      <section className="h-5/6 flex items-center overflow-y-auto">
        <div className="w-5/6 max-w-[720px] min-w-80 mx-auto rounded bg-white h-5/6 grid grid-cols-12">
          <article className="w-full bg-warning-200 col-start-1 col-end-11">a</article>
          <aside className="w-full col-start-11 col-end-13">
            <ul className="mt-4 w-full">
              <Link
                href="/settings/account"
                className="block relative w-full h-10 hover:bg-green-600 py-2"
              >
                <Account className="md:hidden mx-auto" />
                <p className="md:block hidden w-full text-center">Profile</p>
              </Link>
              <button className="w-full text-center hover:bg-green-600 py-2">
                <p className="md:inline hidden text-red-500">Delete Account</p>
              </button>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  )
}
