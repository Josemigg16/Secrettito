'use client'
import { useSession } from 'next-auth/react'

export default function page() {
  const { data: session } = useSession()
  return (
    <article>
      <p className="mt-4 text-lg">Nombre: {session?.user?.name}</p>
      <p className="mt-4 text-lg">Email: {session?.user?.email}</p>
    </article>
  )
}
