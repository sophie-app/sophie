import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'
import type { THEMES } from '../constants/theme'

type Theme = (typeof THEMES)[number]
const isDeviceDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

const themeAtom = atomWithStorage<Theme>('theme', isDeviceDarkTheme ? 'dark' : 'light')

export const setThemeWithoutRender = () => {
  const theme = localStorage.getItem('theme')
  const isLightTheme = theme === 'light' || (theme === null && !isDeviceDarkTheme)
  document.body.classList.add(isLightTheme ? 'light' : 'dark')
}

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [theme, setTheme])

  return { theme, setTheme, toggleTheme }
}
