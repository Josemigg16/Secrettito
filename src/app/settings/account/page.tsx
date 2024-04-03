'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState, type SetStateAction } from 'react'
import { Divider } from '@nextui-org/react'

export default function page() {
  const { data: session } = useSession()
  const [username, setUsername] = useState('')
  const [fetchingUsername, setFetchingUsername] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChangeUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (invalid) return
    setFetchingUsername(true)
    e.currentTarget.blur()
    const res = await fetch(`/api/users/${session?.user?.email}`, {
      method: 'PATCH',
      body: JSON.stringify({ username }),
    })
    const newUsername = (await res.json()) as string
    setUsername(newUsername)
    setFetchingUsername(false)
    setSuccess(true)
  }

  useEffect(() => {
    if (session) {
      const fetchUsername = async () => {
        const res = await fetch(`/api/users/${session?.user?.email}`)
        const data = (await res.json()) as SetStateAction<string>
        setUsername(data)
      }
      void fetchUsername()
    }
  }, [session])

  return (
    <article className="text-xl">
      <h2 className="text-3xl font-bold">Información</h2>
      <p className="mt-4">Nombre: {session?.user?.name}</p>
      <p className="mt-4">Email: {session?.user?.email}</p>
      <Divider className="my-6" />
      <form onSubmit={handleChangeUsername}>
        <h2 className="mt-4 text-2xl font-bold">Modifica tu usuario</h2>
        Username: {username ? '@' : ''}
        <input
          id="username-input"
          disabled={fetchingUsername}
          className={`mt-2 bg-transparent shadow-none outline-none
          ${success ? `text-green-600` : ''}
           ${invalid ? `text-red-600` : ''}`}
          type="text"
          maxLength={16}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            e.target.value.length > 3 ? setInvalid(false) : setInvalid(true)
            setSuccess(false)
          }}
        />
      </form>
    </article>
  )
}
