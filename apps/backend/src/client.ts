import { hc } from 'hono/client'
import type { HonoRoutes } from '.'

export const honoClient = (baseUrl: string) => hc<HonoRoutes>(baseUrl)
