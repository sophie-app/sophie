import type { Client } from 'openapi-fetch'
import type { paths } from '../lib/odptApiPath'
import { calculateSphericalDistance } from '../utils/calculateSphericalDistance'

export const stationUseCases = {
  getNearestStation: async (lat: number, lon: number, odptClient: Client<paths>) => {
    const res = await odptClient.GET('/places/{RDF_TYPE}', {
      params: { path: { RDF_TYPE: 'odpt:Station' }, query: { lat, lon, radius: 4000 } },
    })
    const stations = res.data

    const nearestStation = stations?.reduce((nearest, current) => {
      const nearestDistance = calculateSphericalDistance(
        lat,
        lon,
        nearest['geo:lat'],
        nearest['geo:long'],
      )
      const currentDistance = calculateSphericalDistance(
        lat,
        lon,
        current['geo:lat'],
        current['geo:long'],
      )
      return currentDistance < nearestDistance ? current : nearest
    })

    return nearestStation
  },
}
