import { create } from "zustand"

const useNotificationStore = create((set) => ({
  message: null,
  setMessage: (message) => {
    set({ message })
    setTimeout(() => {
      set({ message: null })
    }, 5000)
  },
}))

export const useNotificationAction = () =>
  useNotificationStore((state) => state.setMessage)

export const useNotificationMessage = () =>
  useNotificationStore(state => state.message)
