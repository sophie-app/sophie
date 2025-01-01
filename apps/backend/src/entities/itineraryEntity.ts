import { z } from 'zod'
import { locationSchema } from './locationEntity'

export const userInputItinerarySchema = z.object({
  from: locationSchema,
  to: locationSchema,
  departureTime: z
    .string()
    .datetime()
    .transform((date) => new Date(date)),
})

export type UserInputItinerary = z.infer<typeof userInputItinerarySchema>
