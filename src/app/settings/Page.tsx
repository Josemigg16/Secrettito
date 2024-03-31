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
        <div className="w-5/6 max-w-[720px] min-w-80 mx-auto rounded bg-white h-5/6 flex">
          <article className="w-full max-w-[550px] bg-warning-200">a</article>
          <aside className="w-12 mix-w-12">
            <ul className="mt-4 w-full">
              <Link
                href="/settings/account"
                className="block relative w-full h-10 hover:bg-green-600 py-2"
              >
                <Account className="absolute md:left-3 left-8" />
                <p className="md:block hidden w-full text-center ml-12">Account</p>
              </Link>
              <button className="w-full text-center hover:bg-green-600 py-2">
                <p className="md:inline hidden">Delete Account</p>
              </button>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  )
}
