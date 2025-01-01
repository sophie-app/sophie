import type { Client } from '@urql/core'
import { type LanguageModel, Output, generateText, tool } from 'ai'
import { z } from 'zod'
import { type UserInputItinerary, userInputItinerarySchema } from '../entities/itineraryEntity'
import type { Location } from '../entities/locationEntity'
import { parseItinerarySystemPrompt } from '../prompts/itinerary'
import { geocodeRepo } from '../repositories/geocodeRepo'
import { gtfsRepo } from '../repositories/gtfsRepo'

export const itineraryUseCases = {
  /**
   * ユーザーの入力をAIを使用して解析し、出発地、到着地、出発時刻を取得します。
   * @param data ユーザーの現在地と音声入力の文字起こしを含むデータ
   * @param options AIモデルとGoogle Maps APIキー
   * @returns 出発地、到着地、出発時刻を含むオブジェクト
   */
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
      maxSteps: 25,
      tools: {
        getCurrentDate: tool({
          description: '現在の日時を取得します',
          parameters: z.object({}),
          execute: async () => new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
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
  /**
   * ユーザーの入力した経路を取得します。
   * @param gtfsApiClient GTFS APIクライアント
   * @param data 出発地、到着地、出発時刻を含むオブジェクト (`UserInputItinerary`)
   */
  getRoute: async (gtfsApiClient: Client, data: UserInputItinerary) => {
    const [itinerary] = await gtfsRepo.getRoute(
      gtfsApiClient,
      data.from,
      data.to,
      data.departureTime,
    )

    return {
      ...data,
      itinerary,
    }
  },
}
