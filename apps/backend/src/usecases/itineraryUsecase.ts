import { type LanguageModel, Output, generateText, tool } from 'ai'
import { z } from 'zod'
import { userInputItinerarySchema } from '../entities/itineraryEntity'
import type { Location } from '../entities/locationEntity'
import { parseItinerarySystemPrompt } from '../prompts/itinerary'
import { geocodeRepo } from '../repositories/geocodeRepo'

export const itineraryUseCases = {
  parseInput: async (
    data: { currentLocation: Location; input: string },
    options: { aiModel: LanguageModel; googleMapsApiKey: string },
  ) => {
    const { experimental_output } = await generateText({
      model: options.aiModel,
      messages: [
        { role: 'system', content: parseItinerarySystemPrompt },
        { role: 'user', content: data.input },
      ],
      tools: {
        getCurrentDate: tool({
          description: '現在の日時を取得します',
          parameters: z.object({}),
          execute: async () => new Date().toISOString(),
        }),
        getCurrentLocation: tool({
          description: 'ユーザーの現在地の緯度経度を取得します',
          parameters: z.object({}),
          execute: async () => data.currentLocation,
        }),
        getLocationFromPlaceName: tool({
          description: '場所名から緯度経度を取得します',
          parameters: z.object({
            placeName: z.string().describe('場所名 (例: 東京駅)'),
          }),
          execute: async ({ placeName }) => {
            return await geocodeRepo.getLocationFromPlaceName(placeName, options.googleMapsApiKey)
          },
        }),
      },
      experimental_output: Output.object({
        schema: userInputItinerarySchema,
      }),
    })

    return experimental_output
  },
}
