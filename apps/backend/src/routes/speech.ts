import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { TTS_VOICE_TYPE } from '../constants/voice'
import { honoFactory } from '../factory'
import { audioUseCases } from '../usecases/audioUseCase'

const postReqBodySchema = z.object({
  text: z.string(),
  voiceType: z.enum(TTS_VOICE_TYPE).default(TTS_VOICE_TYPE[0]),
})

export const speechRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', postReqBodySchema), async (c) => {
    const { text, voiceType } = c.req.valid('json')
    const speechResponse = await audioUseCases.createSpeech(text, c.var.openaiClient, voiceType)

    return speechResponse
  })
