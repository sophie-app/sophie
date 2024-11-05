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
  .post('/', vValidator('json', postReqBodySchema), async (c) => {
    const { lat, lon } = c.req.valid('json')
    const nearestStation = await stationUseCases
      .getNearestStation(lat, lon, c.var.odptClient)
      .catch(() => {
        return c.text('Failed to get nearest station', 500)
      })

    return c.json({ station: nearestStation }, 200)
  })
