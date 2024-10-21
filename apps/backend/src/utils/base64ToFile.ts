export const base64ToFile = (base64: string, fileName: string, type: string) => {
  const latin1Uint8Array = atob(base64)
  const charCodes = [...latin1Uint8Array].map((char) => char.charCodeAt(0))
  const unit8Array = new Uint8Array(charCodes)
  const file = new File([unit8Array], fileName, { type })
  return file
}
