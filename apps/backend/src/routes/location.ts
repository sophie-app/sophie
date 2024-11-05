import { vValidator } from '@hono/valibot-validator'
import { number, object } from 'valibot'
import { honoFactory } from '../factory'
import { stationUseCases } from '../usecases/stationUseCase'

const postReqBodySchema = object({
  lat: number(),
  lon: number(),
})

export const locationRoute = honoFactory
  .createApp()
  .get('/', vValidator('json', postReqBodySchema), async (c) => {
    const { lat, lon } = c.req.valid('json')
    try {
      const nearestStation = await stationUseCases.getNearestStation(lat, lon, c.var.odptClient)
      return c.json({ station: nearestStation }, 200)
    } catch (e) {
      return c.json({ error: e }, 500)
    }
  })
