"use client"
import { redirect } from "next/navigation"
import { useSession, signIn } from "next-auth/react"
import useChooseLanguage from "./hooks/useChooseLang"
import SessionButton from "@/components/SessionButton"
import Instagram from "@public/icons/Instagram"
import Google from "@public/icons/Google"
import { BarlowCondensed } from "@/fonts/fonts"
import { Divider } from "@nextui-org/react"

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
          <header className="absolute top-0 flex h-24 w-full justify-end">
            <ChooseLanguage className="mr-5" setLang={setLang} />
          </header>
          <section className="grid h-full lg:grid-cols-3">
            <div className="col-start-1 col-end-3 hidden lg:block"></div>
            <div className="flex items-center justify-center">
              <article className="mx-5 h-96 w-[320px] min-w-[320px] rounded-lg border-1 border-gray-300 bg-white p-5 shadow-lg">
                <h2 className="mt-4 h-[72px] text-center text-3xl font-bold uppercase">
                  {dict.registerMessage}
                </h2>
                <Divider className="my-8" />
                <section className="space-y-1">
                  <SessionButton
                    onClick={async () =>
                      await signIn("google", {
                        callbackUrl: "/dashboard",
                      })
                    }
                    className="bg-gg gradient-hover h-14 w-full transition-background"
                    Icon={Google}
                  >
                    <p className="text-xl text-gray-100">{dict.signInWithGg}</p>
                  </SessionButton>
                  <SessionButton
                    disabled={true}
                    onClick={() => {
                      alert("hello")
                    }}
                    className="bg-ig-np h-14 w-full opacity-50 transition-background"
                    Icon={Instagram}
                  >
                    <p className="text-xl text-gray-100">{dict.signInWithIg}</p>
                  </SessionButton>
                </section>
              </article>
            </div>
          </section>
          <small className="absolute bottom-1 w-full text-center text-gray-200 opacity-55">
            Powered by{" "}
            <a
              target="_blank"
              href="https://github.com/Josemigg16"
              rel="noreferrer"
            >
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
