import { useState } from 'react'
import { apiClient } from '../lib/apiClient'

export const TextToSpeechPlayer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('本日の天気予報です。')
  const [error, setError] = useState<string | null>(null)

  const handlePlay = async () => {
    if (!text.trim()) {
      setError('テキストを入力してください。')
      return
    }
    try {
      setIsLoading(true)
      setError(null)

      const response = await apiClient.tts.$post({ json: { text } })

      const arybuf = await response.arrayBuffer()

      const blob = new Blob([arybuf], { type: 'audio/mpeg' })

      const audioUrl = URL.createObjectURL(blob)

      const audio = new Audio(audioUrl)

      await audio.play()
    } catch (err) {
      console.error('再生中にエラーが発生しました:', err)
      setError('音声の再生中にエラーが発生しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        cols={50}
        placeholder="テキストを入力してください"
      />
      <br />
      <button onClick={handlePlay} disabled={isLoading} type="button">
        {isLoading ? '読み上げ中...' : '音声読み上げ'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
