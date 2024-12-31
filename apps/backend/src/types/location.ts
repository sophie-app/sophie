import { z } from 'zod'

export const locationSchema = z
  .object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
  })
  .strict()

export type Location = z.infer<typeof locationSchema>
