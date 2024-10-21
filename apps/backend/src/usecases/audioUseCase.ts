import type OpenAI from 'openai'
import { base64ToFile } from '../utils/base64ToFile'

export const audioUseCases = {
  createTranscription: async (fileBase64: string, openaiClient: OpenAI) => {
    const audioFile = base64ToFile(fileBase64, 'audio.mp3', 'audio/mp3')
    const { text } = await openaiClient.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'ja',
    })

    return text
  },
}
