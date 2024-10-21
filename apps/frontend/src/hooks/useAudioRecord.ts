import { useCallback, useRef, useState } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'

export const useAudioRecord = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const recorderRef = useRef<RecordRTC | null>(null)

  const startRecording = useCallback(async () => {
    if (isRecording) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: StereoAudioRecorder,
      })

      recorder.startRecording()
      recorderRef.current = recorder
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }, [isRecording])

  const stopRecording = useCallback(() => {
    if (!isRecording || recorderRef.current === null) return

    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current?.getBlob()
      setAudioBlob(blob ?? null)
      recorderRef.current?.destroy()
      recorderRef.current = null
    })

    setIsRecording(false)
  }, [isRecording])

  return { isRecording, audioBlob, startRecording, stopRecording }
}
