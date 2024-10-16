import { honoFactory } from '../factory'

export const healthRoute = honoFactory.createApp().get('/', (c) => {
  return c.json({ status: 'ok' }, 200)
})
