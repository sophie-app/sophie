import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { createMiddleware } from 'hono/factory'
import { url, object, parse, pipe, string } from 'valibot'

const gtfsApiEnvSchema = object({
  OTP_GTFS_API_BASEURL: pipe(string(), url()),
})

export const gtfsApiClientMiddleware = createMiddleware(async (c, next) => {
  const { OTP_GTFS_API_BASEURL } = parse(gtfsApiEnvSchema, c.env)

  const gtfsApiClient = createClient({
    url: OTP_GTFS_API_BASEURL,
    exchanges: [cacheExchange, fetchExchange],
  })

  c.set('gtfsApiClient', gtfsApiClient)

  await next()
})
