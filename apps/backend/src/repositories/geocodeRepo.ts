import { mapsApiClient } from '../lib/mapsApiClient'

export const geocodeRepo = {
  getLocationFromPlaceName: async (placeName: string, mapsApiKey: string) => {
    const { data: result } = await mapsApiClient.geocode({
      params: {
        key: mapsApiKey,
        address: placeName,
      },
    })
    const data = result.results.at(0)

    if (data === undefined) {
      throw new Error('(geocodeRepo: getLocationFromPlaceName) No results found')
    }

    return {
      lat: data.geometry.location.lat,
      lon: data.geometry.location.lng,
    }
  },
}
