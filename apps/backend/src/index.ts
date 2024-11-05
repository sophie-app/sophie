import { honoFactory } from './factory'
import { healthRoute } from './routes/health'
import { locationRoute } from './routes/location'
import { speechRoute } from './routes/speech'
import { transcriptionRoute } from './routes/transcription'

const app = honoFactory.createApp()

const routes = app
  .route('/health', healthRoute)
  .route('/transcription', transcriptionRoute)
  .route('/speech', speechRoute)
  .route('/location', locationRoute)

export type HonoRoutes = typeof routes

// biome-ignore lint/style/noDefaultExport: this file is the entry point of the app
export default app
