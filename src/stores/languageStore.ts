import { create } from 'zustand'

type Dict = Record<string, any>

interface LanguageProps {
  dict: Dict
  setDict: (dict: Dict) => void
  lang: string
  setLang: (lang: string) => void
}

export const useLanguageStore = create<LanguageProps>()((set) => ({
  dict: {},
  setDict: (dict) => set({ dict }),
  lang: 'es',
  setLang: (lang) => set({ lang }),
}))
