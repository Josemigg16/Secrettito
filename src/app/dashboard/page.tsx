"use client"
import { useSession } from "next-auth/react"
import useChooseLanguage from "../hooks/useChooseLang"
import Header from "@/components/Header"

export default function Page() {
  const { dict, setLang, ChooseLanguage } = useChooseLanguage({})
  const { data: session } = useSession()
  console.log(session)

  return (
    <main className="">
      <Header setLang={setLang} ChooseLanguage={ChooseLanguage} />
      <section className="mt-32">
        <p>Article</p>
      </section>
    </main>
  )
}
