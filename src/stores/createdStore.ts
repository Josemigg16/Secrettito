import { create } from 'zustand'

interface createdState {
    created: boolean
    setCreated: (created: boolean) => void
}

export const useCreatedStore = create<createdState>()((set) => ({
    created: false,
    setCreated: (created: boolean) => set({ created })
}))