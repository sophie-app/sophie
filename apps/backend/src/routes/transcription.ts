import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../factory'
import { audioUseCases } from '../usecases/audioUseCase'

const postReqBodySchema = z.object({
  file: z.string().min(1),
})

export const transcriptionRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', postReqBodySchema), async (c) => {
    const { file: fileBase64 } = c.req.valid('json')
    const transcription = await audioUseCases.createTranscription(fileBase64, c.var.openaiClient)

    return c.json({ transcription }, 200)
  })
