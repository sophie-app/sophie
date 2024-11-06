import { vValidator } from '@hono/valibot-validator'
import { array, object, pipe, string, transform, union } from 'valibot'
import { honoFactory } from '../factory'
import { locationSchema } from '../types/location'
import { stationUseCases } from '../usecases/stationUseCase'

const getReqQuerySchema = object({
  lat: pipe(
    union([string(), array(string())]),
    transform((input) => {
      const value = Array.isArray(input) ? input[0] : input
      const parsed = Number(value)
      if (Number.isNaN(parsed)) throw new Error('lat must be a number')
      return parsed
    }),
    locationSchema.entries.lat,
  ),
  lon: pipe(
    union([string(), array(string())]),
    transform((input) => {
      const value = Array.isArray(input) ? input[0] : input
      const parsed = Number(value)
      if (Number.isNaN(parsed)) throw new Error('lon must be a number')
      return parsed
    }),
    locationSchema.entries.lon,
  ),
})

export const nearestStationRoute = honoFactory
  .createApp()
  .get('/', vValidator('query', getReqQuerySchema), async (c) => {
    const { lat, lon } = c.req.valid('query')
    try {
      const nearestStation = await stationUseCases.getNearestStation({ lat, lon }, c.var.odptClient)
      return c.json({ station: nearestStation }, 200)
    } catch (e) {
      return c.json({ error: e }, 500)
    }
  })
