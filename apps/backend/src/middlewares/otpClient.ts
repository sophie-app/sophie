import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { createMiddleware } from 'hono/factory'
import { url, object, parse, pipe, string } from 'valibot'

const otpEnvSchema = object({
  OTP_API_BASEURL: pipe(string(), url()),
})

export const otpClientMiddleware = createMiddleware(async (c, next) => {
  const { OTP_API_BASEURL } = parse(otpEnvSchema, c.env)

  const otpClient = createClient({
    url: OTP_API_BASEURL,
    exchanges: [cacheExchange, fetchExchange],
  })

  c.set('otpClient', otpClient)

  await next()
})
