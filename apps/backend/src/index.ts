import { honoFactory } from './factory'
import { healthRoute } from './routes/health'
import { speechRoute } from './routes/speech'
import { transcriptionRoute } from './routes/transcription'

const app = honoFactory.createApp()

const routes = app
  .route('/health', healthRoute)
  .route('/transcription', transcriptionRoute)
  .route('/speech', speechRoute)

export type HonoRoutes = typeof routes

// biome-ignore lint/style/noDefaultExport: this file is the entry point of the app
export default app
