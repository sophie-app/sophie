import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../factory'
import { stationUseCases } from '../usecases/stationUseCase'

const getReqQuerySchema = z.object({
  lat: z.union([z.string(), z.array(z.string())]).transform((input) => {
    const value = Array.isArray(input) ? input[0] : input
    const parsed = Number(value)
    if (Number.isNaN(parsed)) throw new Error('lat must be a number')
    return parsed
  }),
  lon: z.union([z.string(), z.array(z.string())]).transform((input) => {
    const value = Array.isArray(input) ? input[0] : input
    const parsed = Number(value)
    if (Number.isNaN(parsed)) throw new Error('lon must be a number')
    return parsed
  }),
})

export const nearestStationRoute = honoFactory
  .createApp()
  .get('/', zValidator('query', getReqQuerySchema), async (c) => {
    const { lat, lon } = c.req.valid('query')
    try {
      const nearestStation = await stationUseCases.getNearestStation({ lat, lon }, c.var.odptClient)
      return c.json({ station: nearestStation }, 200)
    } catch (e) {
      return c.json({ error: e }, 500)
    }
  })
