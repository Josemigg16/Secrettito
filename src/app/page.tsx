"use client"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import useChooseLanguage from "./hooks/useChooseLang"
import SessionButton from "@/components/SessionButton"
import Instagram from "@public/icons/Instagram"
import { BarlowCondensed } from "@/fonts/fonts"
import { Divider } from "@nextui-org/react"
import { signIn } from "next-auth/react"

export default function Home() {
  const { setLang, dict, ChooseLanguage } = useChooseLanguage({
    registerMessage: "",
    signInWithIg: "",
    signInWithGg: "",
  })

  const { data: session } = useSession()
  return (
    <>
      {!session ? (
        <main
          className={`${BarlowCondensed.className} bg-ig relative h-screen overflow-hidden`}
        >
          <header className="absolute flex justify-end top-0 h-24 w-full">
            <ChooseLanguage className="mr-5" setLang={setLang} />
          </header>
          <section className="grid h-full md:grid-cols-3">
            <div className="hidden lg:block"></div>
            <div className="flex items-center">
              <article className="mx-5 h-96 w-full rounded-lg bg-white p-5 border-gray-300 border-1 shadow-lg">
                <h2 className="text-center font-bold uppercase text-3xl mt-4 h-[72px]">
                  {dict.registerMessage}
                </h2>
                <Divider className="my-8" />
                <section className="space-y-1">
                  <SessionButton
                    onClick={() => alert("hello")}
                    className="w-full h-14 bg-ig-np gradient-hover transition-background"
                    Icon={Instagram}
                  >
                    <p className="text-xl text-gray-100">{dict.signInWithIg}</p>
                  </SessionButton>
                  <SessionButton
                    onClick={() => signIn("google")}
                    className="w-full h-14 bg-gg gradient-hover transition-background"
                    Icon={Instagram}
                  >
                    <p className="text-xl text-gray-100">{dict.signInWithGg}</p>
                  </SessionButton>
                </section>
              </article>
            </div>
          </section>
          <small className="absolute bottom-1 text-center w-full text-gray-200 opacity-55">
            Powered by{" "}
            <a target="_blank" href="https://github.com/Josemigg16">
              Josemigg
            </a>
          </small>
        </main>
      ) : (
        redirect("/dashboard")
      )}
    </>
  )
}
