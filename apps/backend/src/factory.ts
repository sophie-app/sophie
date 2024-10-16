import { createFactory } from 'hono/factory'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { corsMiddleware } from './middlewares/cors'

export type BindingsType = {
  FRONTEND_BASE_URL: string | undefined
}

type HonoConfigType = {
  Bindings: BindingsType
}

const honoFactory = createFactory<HonoConfigType>({
  initApp: (app) => {
    app.use(corsMiddleware(), trimTrailingSlash(), prettyJSON(), poweredBy())
  },
})

export { honoFactory }
