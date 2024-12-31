import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { createMiddleware } from 'hono/factory'
import { z } from 'zod'

const gtfsApiEnvSchema = z.object({
  OTP_GTFS_API_BASEURL: z.string().url(),
})

export const gtfsApiClientMiddleware = createMiddleware(async (c, next) => {
  const { OTP_GTFS_API_BASEURL } = gtfsApiEnvSchema.parse(c.env)

  const gtfsApiClient = createClient({
    url: OTP_GTFS_API_BASEURL,
    exchanges: [cacheExchange, fetchExchange],
  })

  c.set('gtfsApiClient', gtfsApiClient)

  await next()
})
