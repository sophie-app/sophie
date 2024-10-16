import { createFactory } from 'hono/factory'
import { corsMiddleware } from './middlewares/cors'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { prettyJSON } from 'hono/pretty-json'
import { poweredBy } from 'hono/powered-by'

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
