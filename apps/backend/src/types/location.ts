import { type InferOutput, maxValue, minValue, number, object, pipe } from 'valibot'

export const locationSchema = object({
  lat: pipe(number(), minValue(-90), maxValue(90)),
  lon: pipe(number(), minValue(-180), maxValue(180)),
})

export type Location = InferOutput<typeof locationSchema>
