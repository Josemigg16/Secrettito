import { SetStateAction } from "react"
import { Dispatch } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { Divider } from "@nextui-org/react"
import FaBars from "@public/icons/FaBars"

interface ChooseLanguageArguments {
  className: string
  setLang: Dispatch<SetStateAction<string>>
}

interface Props {
  setLang: Dispatch<SetStateAction<string>>
  ChooseLanguage: ({
    className,
    setLang,
  }: ChooseLanguageArguments) => JSX.Element
  className?: string
}

function Header({ setLang, ChooseLanguage, className }: Props) {
  const showAside = () => {
    const $aside = document.querySelector("aside")
    const $label = document.querySelector("#toggle-aside-label")
    const $overlay = document.querySelector("#overlay")
    if ($aside) {
      $aside.classList.toggle("-translate-x-60")
      if ($label) $label.classList.toggle("-rotate-90")
      if ($overlay) {
        $overlay.classList.toggle("hidden")
      }
    }
  }
  return (
    <>
      <div
        onClick={() => {
          const $input = document.querySelector(
            "#toggle-aside"
          ) as HTMLInputElement
          $input.checked = false
          showAside()
        }}
        id="overlay"
        className="h-full w-full bg-black opacity-60 top-0 z-20 absolute hidden"
      ></div>
      <header
        className={`${className} flex justify-center items-center top-0 h-24 w-full gap-3`}
      >
        <label
          htmlFor="toggle-aside"
          id="toggle-aside-label"
          className="cursor-pointer absolute w-20 h-[4.8rem] transition-[100ms] rounded-full flex items-center left-0 z-50 border-none hover:scale-110"
        >
          <FaBars className="relative" />
        </label>
        <Link href="/dashboard" className="text-4xl uppercase font-bold ">
          Secrettito
        </Link>
        <input
          type="checkbox"
          id="toggle-aside"
          hidden
          onChange={() => showAside()}
        />
        <aside className="absolute left-0 top-0 h-screen w-60 bg-green-400 -translate-x-60 transition-transform z-30">
          <ul className="mt-24">
            <Link
              href="/settings"
              className="block w-full text-center hover:bg-green-600 py-2"
            >
              Configuración
            </Link>
            <Divider />
            <button
              className="text-center w-full hover:bg-green-600 py-2"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              Sign Out
            </button>
          </ul>
        </aside>
        <ChooseLanguage className="right-0 absolute" setLang={setLang} />
      </header>
    </>
  )
}

export default Header
