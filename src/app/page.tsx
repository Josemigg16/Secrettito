import ChooseLanguage from "@/components/ChooseLanguage.jsx"
import SessionButton from "@/components/SessionButton"
import Instagram from "@public/icons/Instagram"
import { Divider } from "@nextui-org/react"
import { Barlow_Condensed } from "next/font/google"

const BarlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
})

export default function Home() {
  return (
    <main
      className={`${BarlowCondensed.className} bg-ig relative h-screen overflow-hidden`}
    >
      <header className="absolute flex justify-end top-0 h-24 w-full">
        <ChooseLanguage className="mr-5" />
      </header>
      <section className="grid h-full md:grid-cols-3">
        <div className="hidden md:block"></div>
        <div className="flex items-center">
          <article className="mx-5 h-96 w-full rounded-lg bg-white p-5 border-gray-300 border-1 shadow-lg">
            <h2 className="text-center font-bold uppercase text-3xl mt-4">
              Regístrate para recibir mensajes anónimos
            </h2>
            <Divider className="my-8" />
            <form className="space-y-1">
              <SessionButton
                className="w-full h-14 bg-ig-np gradient-hover transition-background"
                Icon={Instagram}
              >
                <p className="text-xl text-gray-100">Inicia con Instagram</p>
              </SessionButton>
              <SessionButton
                className="w-full h-14 bg-gg gradient-hover transition-background"
                Icon={Instagram}
              >
                <p className="text-xl text-gray-100">Inicia con Google</p>
              </SessionButton>
            </form>
          </article>
        </div>
      </section>
      <p className="absolute bottom-1 text-center w-full text-gray-200 opacity-55">
        Powered by <a href="https://github.com/Josemigg16">Josemigg</a>
      </p>
    </main>
  )
}
