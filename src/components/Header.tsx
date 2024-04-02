import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Divider } from '@nextui-org/react'
import FaBars from '@public/icons/FaBars'
import useChooseLanguage from '@/app/hooks/useChooseLang'

function Header() {
  const { setLang, ChooseLanguage } = useChooseLanguage({})
  const { data: session } = useSession()
  const showAside = () => {
    const $aside = document.querySelector('aside')
    const $label = document.querySelector('#toggle-aside-label')
    const $overlay = document.querySelector('#overlay')
    if ($aside) {
      $aside.classList.toggle('-translate-x-60')
      if ($label) $label.classList.toggle('-rotate-90')
      if ($overlay) {
        $overlay.classList.toggle('hidden')
      }
    }
  }
  return (
    <>
      <div
        onClick={() => {
          const $input = document.querySelector(
            '#toggle-aside',
          ) satisfies HTMLInputElement | null
          if ($input) $input.checked = false
          showAside()
        }}
        id="overlay"
        className="absolute top-0 z-20 hidden h-full w-full bg-black opacity-70 2xl:bg-transparent"
      ></div>
      <header className="top-0 flex h-24 w-full items-center justify-center gap-3">
        {session ? (
          <label
            htmlFor="toggle-aside"
            id="toggle-aside-label"
            className="absolute left-0 z-50 flex h-[4.8rem] w-20 cursor-pointer items-center rounded-full border-none transition-[100ms] hover:scale-110"
          >
            <FaBars className="relative" />
          </label>
        ) : (
          <></>
        )}
        <Link
          color="foreground"
          href={session ? '/dashboard?post=null' : '/'}
          className="hidden h-full items-center text-4xl font-bold uppercase transition-transform hover:scale-110 lg:flex"
        >
          Secrettito
        </Link>
        <input
          type="checkbox"
          id="toggle-aside"
          hidden
          onChange={() => {
            showAside()
          }}
        />
        <aside className="absolute left-0 top-0 z-30 h-screen w-60 -translate-x-60 bg-slate-200 transition-transform transition-background 2xl:flex 2xl:items-center 2xl:bg-transparent">
          <ul className="mt-32 w-full 2xl:mb-56 2xl:mt-0 [&>*]:text-2xl 2xl:[&>*]:text-4xl 2xl:[&>*]:text-slate-200">
            <Divider className="2xl:hidden" />
            <Link
              color="foreground"
              href="/dashboard?post=null"
              className="block w-full py-2 text-center transition-transform md:hover:scale-110"
            >
              Inicio
            </Link>
            <Divider className="2xl:hidden" />
            <Link
              color="foreground"
              href="/settings/account"
              className="block w-full py-2 text-center transition-transform md:hover:scale-110"
            >
              Configuración
            </Link>
            <Divider className="2xl:hidden" />
            <button
              className="w-full py-2 text-center transition-transform hover:opacity-80 md:hover:scale-110"
              onClick={async () => {
                await signOut({
                  callbackUrl: '/',
                })
              }}
            >
              Sign Out
            </button>
            <Divider className="2xl:hidden" />
          </ul>
        </aside>
        <ChooseLanguage
          className="absolute right-3 transition-transform-opacity md:hover:scale-110"
          setLang={setLang}
        />
      </header>
    </>
  )
}

export default Header
