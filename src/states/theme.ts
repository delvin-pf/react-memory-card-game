import { create } from 'zustand'

interface Theme {
  isDark: boolean
  toogle: () => void
}

export const useTheme = create<Theme>((set, get) => {
  return {
    isDark: true,
    toogle: () => {
      set({ isDark: !get().isDark })
    }
  }
})
