import { honoFactory } from './factory'
import { healthRoute } from './routes/health'

const app = honoFactory.createApp()

const routes = app.route('/health', healthRoute)

export type HonoRoutes = typeof routes

// biome-ignore lint/style/noDefaultExport: this file is the entry point of the app
export default app
