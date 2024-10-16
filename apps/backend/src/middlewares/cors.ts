import { cors } from 'hono/cors'

export const corsMiddleware = () =>
  cors({
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: (_, c) => {
      const { FRONTEND_BASE_URL } = c.env
      if (FRONTEND_BASE_URL === undefined) {
        throw new Error('FRONTEND_BASE_URL is not set')
      }

      return FRONTEND_BASE_URL
    },
  })
