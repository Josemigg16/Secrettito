'use client'
import Link from 'next/link'
import Account from '@public/icons/Account'
import Trash from '@public/icons/Trash'
import { Divider } from '@nextui-org/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="mx-auto mt-16 grid h-4/6 w-5/6 min-w-72 max-w-[1000px] grid-cols-12 rounded bg-gray-100">
      <article className="col-start-1 col-end-11 w-full p-6 text-3xl">
        <h2 className="text-5xl">Configuración</h2>
        <Divider className="my-6" />
        <section>{children}</section>
        <Divider className="my-6" />
      </article>
      <aside className="col-start-11 col-end-13 w-full rounded bg-gray-200">
        <ul className="mt-40 text-xl">
          <Divider />
          <Link
            href="/settings/account"
            className="relative block w-full py-2 hover:opacity-80"
          >
            <Account className="mx-auto md:hidden" />
            <p className="hidden w-full text-center md:block">Profile</p>
          </Link>
          <Divider />
          <Link
            href="/settings/delete-account"
            className="block w-full py-2 text-center hover:opacity-80"
          >
            <Trash className="mx-auto md:hidden" />
            <p className="hidden text-red-500 md:inline">Delete Account</p>
          </Link>
          <Divider />
        </ul>
      </aside>
    </section>
  )
}
