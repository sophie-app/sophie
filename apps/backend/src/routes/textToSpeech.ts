import { vValidator } from '@hono/valibot-validator'
import { object, string } from 'valibot'
import { honoFactory } from '../factory'
import { audioUseCases } from '../usecases/audioUseCase'

const postReqBodySchema = object({
  text: string(),
})

export const textToSpeechRoute = honoFactory
  .createApp()
  .post('/', vValidator('json', postReqBodySchema), async (c) => {
    const { text } = c.req.valid('json')
    const speech = await audioUseCases.createSpeech(text, c.var.openaiClient)

    return c.json({ speech }, 200)
  })
