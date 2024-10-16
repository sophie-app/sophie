import { url, object, parse, pipe, string } from 'valibot'

const envValuesSchema = object({
  VITE_BACKEND_BASE_URL: pipe(string(), url()),
})

export const env = parse(envValuesSchema, import.meta.env)
