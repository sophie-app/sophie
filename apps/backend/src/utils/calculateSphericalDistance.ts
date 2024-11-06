import type { Location } from '../types/location'

const degreeToRadian = (degree: number) => degree * (Math.PI / 180)
const EarthRadiusKm = 6371

export const calculateSphericalDistance = (from: Location, to: Location): number => {
  const deltaLatitude = degreeToRadian(to.lat - from.lat)
  const deltaLongitude = degreeToRadian(to.lon - from.lon)

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(degreeToRadian(from.lat)) *
      Math.cos(degreeToRadian(to.lat)) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EarthRadiusKm * c
}
