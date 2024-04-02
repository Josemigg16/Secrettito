import { create } from 'zustand'

interface infoPostState {
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
}

export const useInfoPostStore = create<infoPostState>()((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
  content: '',
  setContent: (content) => set({ content }),
}))
