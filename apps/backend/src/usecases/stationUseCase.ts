import type { Location } from '../entities/locationEntity'
import type { OdptClient } from '../lib/odptApiPath'
import { calculateSphericalDistance } from '../utils/calculateSphericalDistance'

export const stationUseCases = {
  getNearestStation: async ({ lat, lon }: Location, odptClient: OdptClient) => {
    const maxSearchRadius = 4000

    const { data: stations } = await odptClient.GET('/places/{RDF_TYPE}', {
      params: { path: { RDF_TYPE: 'odpt:Station' }, query: { lat, lon, radius: maxSearchRadius } },
    })
    if (stations === undefined) throw new Error('Failed to fetch stations')

    const nearestStation = stations?.reduce((nearest, current) => {
      const nearestDistance = calculateSphericalDistance(
        { lat, lon },
        { lat: nearest['geo:lat'], lon: nearest['geo:long'] },
      )
      const currentDistance = calculateSphericalDistance(
        { lat, lon },
        { lat: current['geo:lat'], lon: current['geo:long'] },
      )
      return currentDistance < nearestDistance ? current : nearest
    })

    return nearestStation
  },
}
