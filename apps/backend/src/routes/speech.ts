import { vValidator } from '@hono/valibot-validator'
import { object, optional, picklist, string } from 'valibot'
import { TTS_VOICE_TYPE } from '../constants/voice'
import { honoFactory } from '../factory'
import { audioUseCases } from '../usecases/audioUseCase'

const postReqBodySchema = object({
  text: string(),
  voiceType: optional(picklist(TTS_VOICE_TYPE), TTS_VOICE_TYPE[0]),
})

export const speechRoute = honoFactory
  .createApp()
  .post('/', vValidator('json', postReqBodySchema), async (c) => {
    const { text, voiceType } = c.req.valid('json')
    const speechResponse = await audioUseCases.createSpeech(text, c.var.openaiClient, voiceType)

    return speechResponse
  })
