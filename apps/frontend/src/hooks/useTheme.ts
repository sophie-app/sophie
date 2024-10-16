import { useCallback, useEffect } from 'react'
import { THEMES } from '../constants/theme'
import { useLocalStorage } from './useLocalStorage'

type Theme = (typeof THEMES)[number]
const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

export const setThemeWithoutRender = () => {
  const theme = localStorage.getItem('theme')
  const isLightTheme = theme === 'light' || (theme === null && !isDarkTheme)
  document.body.classList.add(isLightTheme ? 'light' : 'dark')
}

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', isDarkTheme ? 'dark' : 'light')

  const setThemeClassNames = useCallback((theme?: Theme) => {
    document.body.classList.remove(...THEMES)
    if (theme !== undefined) {
      document.body.classList.add(theme)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [setTheme, theme])

  useEffect(() => {
    setThemeClassNames(theme)
    return () => setThemeClassNames()
  }, [theme, setThemeClassNames])

  return { theme, setTheme, toggleTheme }
}
