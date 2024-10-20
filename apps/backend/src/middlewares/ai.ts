import { createOpenAI } from '@ai-sdk/openai'
import { createMiddleware } from 'hono/factory'
import OpenAI from 'openai'
import { url, object, optional, parse, pipe, string } from 'valibot'

const aiEnvSchema = object({
  OPENAI_API_KEY: string(),
  OPENAI_BASE_URL: optional(pipe(string(), url())),
})

export const aiMiddleware = createMiddleware(async (c, next) => {
  const { OPENAI_API_KEY, OPENAI_BASE_URL } = parse(aiEnvSchema, c.env)

  const openaiProvider = createOpenAI({
    apiKey: OPENAI_API_KEY,
    baseUrl: OPENAI_BASE_URL,
  })
  const model = openaiProvider('gpt-4o')

  c.set('aiModel', model)

  const openaiClient = new OpenAI({
    baseURL: OPENAI_BASE_URL,
    apiKey: OPENAI_API_KEY,
  })

  c.set('openaiClient', openaiClient)

  await next()
})
