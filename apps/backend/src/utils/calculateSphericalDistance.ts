import type { Location } from '../entities/locationEntity'

const degreeToRadian = (degree: number) => degree * (Math.PI / 180)
const EARTH_RADIUS_KM = 6371

/**
 * 2点の緯度経度からその球面距離を計算する関数
 *
 * @param from - 出発地点の位置情報
 * @param to - 到着地点の位置情報
 * @returns 2つの位置情報間の距離（キロメートル）
 */
export const calculateSphericalDistance = (from: Location, to: Location): number => {
  const deltaLatitude = degreeToRadian(to.lat - from.lat)
  const deltaLongitude = degreeToRadian(to.lon - from.lon)

  // Haversineの公式を使用して、2点間の大円距離を求めるために使用される値'a'を計算
  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(degreeToRadian(from.lat)) *
      Math.cos(degreeToRadian(to.lat)) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2)

  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_KM * centralAngle
}
