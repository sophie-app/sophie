import { z } from 'zod'

const envValuesSchema = z.object({
  VITE_BACKEND_BASE_URL: z.string().url(),
})

export const env = envValuesSchema.parse(import.meta.env)
