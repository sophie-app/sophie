import { useEffect, useState } from 'react'

export const useCurrentLocation = () => {
  const [currentGeolocation, setGeolocation] = useState<GeolocationPosition | undefined>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeolocation(position)
    })
  }, [])

  return { currentGeolocation }
}
