import type { Client } from '@urql/core'
import type { LanguageModel } from 'ai'
import { createFactory } from 'hono/factory'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'
import type OpenAI from 'openai'
import type { OdptClient } from './lib/odptApiPath'
import { aiMiddleware } from './middlewares/ai'
import { corsMiddleware } from './middlewares/cors'
import { gtfsApiClientMiddleware } from './middlewares/gtfsApiClient'
import { odptClientMiddleware } from './middlewares/odptClient'

export type BindingsType = {
  FRONTEND_BASE_URL: string | undefined
  ODPT_ACCESS_TOKEN: string
  ODPT_CHALLENGE_ACCESS_TOKEN: string
}

type VariablesType = {
  aiModel: LanguageModel
  openaiClient: OpenAI
  gtfsApiClient: Client
  odptClient: OdptClient
  odptChallengeClient: OdptClient
}

type HonoConfigType = {
  Bindings: BindingsType
  Variables: VariablesType
}

const honoFactory = createFactory<HonoConfigType>({
  initApp: (app) => {
    app.use(corsMiddleware(), trimTrailingSlash(), prettyJSON(), poweredBy())
    app.use(aiMiddleware)
    app.use(odptClientMiddleware)
    app.use(gtfsApiClientMiddleware)
  },
})

export { honoFactory }
