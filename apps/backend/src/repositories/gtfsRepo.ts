import type { Client } from '@urql/core'
import { graphql } from 'gql.tada'
import type { Location } from '../entities/locationEntity'
import { formatDate, formatTime } from '../utils/formatDatetime'

export const gtfsRepo = {
  getRoute: async (
    gtfsApiClient: Client,
    from: Location,
    to: Location,
    departureDatetime: Date,
  ) => {
    const currentDate = formatDate(departureDatetime)
    const currentTime = formatTime(departureDatetime)

    const query = graphql(`
      query PlanQuery($from: InputCoordinates!, $to: InputCoordinates!) {
        plan(from: $from, to: $to, date: "${currentDate}", time: "${currentTime}") {
          itineraries {
            duration
            legs {
              mode
              startTime
              endTime
              from { name }
              to { name }
              distance
            }
          }
        }
      }
    `)

    const { data } = await gtfsApiClient.query(query, { from, to }).toPromise()

    if (data?.plan === null || data?.plan === undefined) {
      throw new Error('failed to get route')
    }

    return data.plan.itineraries
  },
}
