"use client"
import React from "react"
import useChooseLanguage from "../hooks/useChooseLang"
import { signOut } from "next-auth/react"

function Page() {
  const { dict, setLang, ChooseLanguage } = useChooseLanguage({})

  return (
    <>
      <header className="absolute flex justify-end top-0 h-24 w-full gap-3">
        <button onClick={()=> signOut()}>
            Sign Out
        </button>
        <ChooseLanguage className="" setLang={setLang} />
      </header>
      <p>Dashboard</p>
    </>
  )
}

export default Page
