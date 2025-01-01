/**
 * 日付を `YYYY-MM-DD` 形式にフォーマットする
 * @param date 日付
 * @returns フォーマットされた日付
 */
export const formatDate = (date: Date): string => {
  const dateString = date.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })
  return dateString.replaceAll('/', '-')
}

/**
 * 時刻を `HH:MM:SS` 形式にフォーマットする
 * @param date 日付
 * @returns フォーマットされた時刻
 */
export const formatTime = (date: Date): string => {
  const timeString = date.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour12: false })
  return timeString
}
