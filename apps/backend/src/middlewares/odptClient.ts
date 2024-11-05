import { createMiddleware } from 'hono/factory'
import createClient, { type Middleware } from 'openapi-fetch'
import { minLength, object, parse, pipe, string } from 'valibot'
import { ODPT_API_BASEURL, ODPT_CHALLENGE_API_BASEURL } from '../constants/odpt'
import type { paths } from '../lib/odptApiPath'

const odptEnvSchema = object({
  ODPT_ACCESS_TOKEN: pipe(string(), minLength(1)),
  ODPT_CHALLENGE_ACCESS_TOKEN: pipe(string(), minLength(1)),
})

const openapiClientAuthMiddleware = (apiKey: string) => {
  return {
    onRequest: ({ request }) => {
      const url = new URL(request.url)
      url.searchParams.append('acl:consumerKey', apiKey)
      return new Request(url.toString(), request)
    },
  } satisfies Middleware
}

export const odptClientMiddleware = createMiddleware(async (c, next) => {
  const { ODPT_ACCESS_TOKEN, ODPT_CHALLENGE_ACCESS_TOKEN } = parse(odptEnvSchema, c.env)

  const odptClient = createClient<paths>({
    baseUrl: ODPT_API_BASEURL,
  })
  const odptChallengeClient = createClient<paths>({
    baseUrl: ODPT_CHALLENGE_API_BASEURL,
  })

  odptClient.use(openapiClientAuthMiddleware(ODPT_ACCESS_TOKEN))
  odptChallengeClient.use(openapiClientAuthMiddleware(ODPT_CHALLENGE_ACCESS_TOKEN))

  c.set('odptClient', odptClient)
  c.set('odptChallengeClient', odptChallengeClient)

  await next()
})
