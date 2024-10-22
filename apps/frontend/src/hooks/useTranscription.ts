import { useCallback, useState } from 'react'
import { apiClient } from '../lib/apiClient'
import { blobToBase64 } from '../utils/blobToBase64'

export const useTranscription = (audioBlob: Blob | null) => {
  const [transcription, setTranscription] = useState('')

  const getTranscription = useCallback(async () => {
    if (audioBlob === null) return

    const audioBase64 = await blobToBase64(audioBlob)

    const { transcription } = await apiClient.transcription
      .$post({ json: { file: audioBase64 } })
      .then((res) => res.json())

    setTranscription(transcription)
  }, [audioBlob])

  return { transcription, getTranscription }
}
