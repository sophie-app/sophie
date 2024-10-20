import type { LanguageModel } from 'ai'
import { createFactory } from 'hono/factory'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'
import type OpenAI from 'openai'
import { aiMiddleware } from './middlewares/ai'
import { corsMiddleware } from './middlewares/cors'

export type BindingsType = {
  FRONTEND_BASE_URL: string | undefined
}

type VariablesType = {
  aiModel: LanguageModel
  openaiClient: OpenAI
}

type HonoConfigType = {
  Bindings: BindingsType
  Variables: VariablesType
}

const honoFactory = createFactory<HonoConfigType>({
  initApp: (app) => {
    app.use(corsMiddleware(), trimTrailingSlash(), prettyJSON(), poweredBy())
    app.use(aiMiddleware)
  },
})

export { honoFactory }
