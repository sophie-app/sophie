import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { locationSchema } from '../entities/locationEntity'
import { honoFactory } from '../factory'
import { audioUseCases } from '../usecases/audioUseCase'
import { itineraryUseCases } from '../usecases/itineraryUsecase'

const postReqBodySchema = z.object({
  audioFile: z.string().min(1),
  currentLocation: locationSchema,
})

export const itineraryRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', postReqBodySchema), async (c) => {
    const { audioFile, currentLocation } = c.req.valid('json')
    const { aiModel, openaiClient, gtfsApiClient } = c.var
    const { GOOGLE_MAPS_API_KEY: googleMapsApiKey } = c.env

    const transcription = await audioUseCases.createTranscription(audioFile, openaiClient)

    const userInputItinerary = await itineraryUseCases.parseInput(
      { currentLocation, input: transcription },
      { aiModel, googleMapsApiKey },
    )
    const itinerary = await itineraryUseCases.getRoute(gtfsApiClient, userInputItinerary)

    return c.json({ itinerary }, 200)
  })
