'use client'
import Header from '@/components/Header'
import Account from '@public/icons/Account'
import Trash from '@public/icons/Trash'
import { BarlowCondensed } from '@/fonts/fonts'
import { Divider, Link } from '@nextui-org/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main
      className={`${BarlowCondensed.className} bg-ig h-screen overflow-y-hidden`}
    >
      <Header />
      <section className="mx-auto mt-16 grid h-4/6 w-5/6 min-w-72 max-w-[920px] grid-cols-12 rounded bg-gray-100">
        <article className="col-start-1 col-end-11 w-full p-6 text-3xl">
          <h2 className="text-5xl">Configuración</h2>
          <Divider className='my-6'/>
          <section>{children}</section>
          <Divider className='my-6'/>
        </article>
        <aside className="col-start-11 col-end-13 w-full rounded bg-gray-200">
          <ul className="mt-10 w-full">
            <Divider />
            <Link
              href="/settings/account"
              className="relative block h-10 w-full py-2"
            >
              <Account className="mx-auto md:hidden" />
              <p className="hidden w-full text-center md:block">Profile</p>
            </Link>
            <Divider />
            <Link
              href="/settings/delete-account"
              className="block w-full py-2 text-center"
            >
              <Trash className="mx-auto md:hidden" />
              <p className="hidden text-red-500 md:inline">Delete Account</p>
            </Link>
            <Divider />
          </ul>
        </aside>
      </section>
    </main>
  )
}
