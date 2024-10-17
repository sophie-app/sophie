import { createOpenAI } from '@ai-sdk/openai'
import { createMiddleware } from 'hono/factory'
import { url, object, optional, parse, pipe, string } from 'valibot'

const aiEnvSchema = object({
  OPENAI_API_KEY: string(),
  OPENAI_BASE_URL: optional(pipe(string(), url())),
})

export const aiMiddleware = createMiddleware(async (c, next) => {
  const { OPENAI_API_KEY, OPENAI_BASE_URL } = parse(aiEnvSchema, c.env)

  const openai = createOpenAI({
    apiKey: OPENAI_API_KEY,
    baseUrl: OPENAI_BASE_URL,
  })

  const model = openai('gpt-4o')

  c.set('ai', model)

  await next()
})
