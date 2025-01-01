import { createOpenAI } from '@ai-sdk/openai'
import { createMiddleware } from 'hono/factory'
import OpenAI from 'openai'
import { z } from 'zod'

const aiEnvSchema = z.object({
  OPENAI_API_KEY: z.string(),
  OPENAI_BASE_URL: z.string().url().optional(),
})

export const aiMiddleware = createMiddleware(async (c, next) => {
  const { OPENAI_API_KEY, OPENAI_BASE_URL } = aiEnvSchema.parse(c.env)

  const openaiProvider = createOpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL,
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
