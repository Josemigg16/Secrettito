import { create } from 'zustand'

interface infoPostState {
  id: string
  setID: (id: string) => void
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
}

export const useInfoPostStore = create<infoPostState>()((set) => ({
  id: '',
  setID: (id) => set({ id }),
  title: '',
  setTitle: (title) => set({ title }),
  content: '',
  setContent: (content) => set({ content }),
}))
