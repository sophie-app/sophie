import { useCallback, useSyncExternalStore } from 'react'

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export const getStorageItem = <T>(key: string, initialValue: T): T => {
  const value = window.localStorage.getItem(key)
  return value === null ? initialValue : JSON.parse(value)
}

const setStorageItem = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('storage'))
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const value = useSyncExternalStore(subscribe, () => getStorageItem(key, initialValue))
  const setItem = useCallback(
    (value: T) => {
      setStorageItem(key, value)
    },
    [key],
  )

  return [value, setItem] as const
}
