/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import { useEffect, useState } from 'react'
import { Switch } from '@nextui-org/react'
import { Lang } from '@/components/svg/Lang'

function ChooseLanguage ({ className, setLang }) {
  const [isSel, setIsSel] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('lang')
      if (lang === 'en') {
        setIsSel(true)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', isSel ? 'en' : 'es')
    setLang(isSel ? 'en' : 'es')
  }, [isSel])

  return (
    <Switch
      className={className}
      classNames={{
        thumb: 'bg-transparent'
      }}
      isSelected={isSel}
      onChange={() => { setIsSel(!isSel) }}
      size="lg"
      color="default"
      startContent={<p>En</p>}
      endContent={<p>Es</p>}
      thumbIcon={() => <Lang />}
    ></Switch>
  )
}

export default function useChooseLanguage (initialState) {
  const [lang, setLang] = useState('es')
  const [dict, setDict] = useState(initialState)

  import(`@/dictionaries/${lang}.json`)
    .then((res) => res.default)
    .catch(e => { console.log(e) })
    .then((res) => { setDict(res) })
    .catch(e => { console.log(e) })

  return { dict, setLang, ChooseLanguage }
}
