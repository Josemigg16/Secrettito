'use client'
import { redirect } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import useChooseLanguage from './hooks/useChooseLang'
import SessionButton from '@/components/SessionButton'
import Header from '@/components/Header'
import Instagram from '@public/icons/Instagram'
import Google from '@public/icons/Google'
import { BarlowCondensed } from '@/fonts/fonts'
import { Divider } from '@nextui-org/react'

export default function Home() {
  const { dict } = useChooseLanguage({
    registerMessage: '',
    signInWithIg: '',
    signInWithGg: '',
  })

  const { data: session } = useSession()
  return (
    <>
      {!session ? (
        <main
          className={`${BarlowCondensed.className} bg-ig relative h-screen overflow-hidden`}
        >
          <Header />
          <section className="grid lg:grid-cols-3 h-[70vh]">
            <div className="col-start-1 col-end-3 hidden flex-col justify-center p-16 text-white text-opacity-85 lg:flex">
              <h1 className="text-9xl">Bienvenido a Secrettito</h1>
              <h2 className="ml-16 text-3xl">
                Crea publicaciones y tus amigos te enviarán mensajes anónimos!
              </h2>
            </div>
            <div className="h-[65vh] flex items-end justify-center lg:justify-start overflow-auto">
              <article className="h-96 min-w-[320px] max-w-[350px] scale-85 rounded-lg border-1 border-gray-300 bg-white p-5 shadow-lg sm:scale-100">
                <h2 className="mt-4 h-[72px] text-center text-3xl font-bold uppercase">
                  {dict.registerMessage}
                </h2>
                <Divider className="my-8" />
                <footer className="space-y-1">
                  <SessionButton
                    onClick={async () =>
                      await signIn('google', {
                        callbackUrl: '/dashboard',
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
                      alert('hello')
                    }}
                    className="bg-ig-np h-14 w-full opacity-50 transition-background"
                    Icon={Instagram}
                  >
                    <p className="text-xl text-gray-100">{dict.signInWithIg}</p>
                  </SessionButton>
                </footer>
              </article>
            </div>
          </section>
          <small className="absolute bottom-1 w-full text-center text-gray-200 opacity-55">
            Powered by{' '}
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
        redirect('/dashboard')
      )}
    </>
  )
}
