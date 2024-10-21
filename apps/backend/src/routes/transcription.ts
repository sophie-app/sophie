import { vValidator } from '@hono/valibot-validator'
import { object, string } from 'valibot'
import { honoFactory } from '../factory'
import { audioUseCases } from '../usecases/audioUseCase'

const postReqBodySchema = object({
  file: string(),
})

export const transcriptionRoute = honoFactory
  .createApp()
  .post('/', vValidator('json', postReqBodySchema), async (c) => {
    const { file: fileBase64 } = c.req.valid('json')
    const transcription = await audioUseCases.createTranscription(fileBase64, c.var.openaiClient)

    return c.json({ transcription }, 200)
  })
