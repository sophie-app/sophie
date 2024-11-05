import type { paths } from 'odpt-openapi-generated'
import type { Client } from 'openapi-fetch'

const API_KEY_PROPERTY_NAME = 'acl:consumerKey' as const

type ApiKeyPropertyName = typeof API_KEY_PROPERTY_NAME
type UsedHttpMethod = 'get'

type OmitApiKey<Path extends object> = {
  [Endpoint in keyof Path]: {
    [Property in keyof Path[Endpoint]]: Property extends UsedHttpMethod
      ? {
          [MethodProperty in keyof Path[Endpoint][Property]]: MethodProperty extends 'parameters'
            ? {
                [Parameter in keyof Path[Endpoint][Property][MethodProperty]]: Parameter extends 'query'
                  ? Omit<Path[Endpoint][Property][MethodProperty][Parameter], ApiKeyPropertyName>
                  : Path[Endpoint][Property][MethodProperty][Parameter]
              }
            : Path[Endpoint][Property][MethodProperty]
        }
      : Path[Endpoint][Property]
  }
}

type OmitApiKeyFromPaths = OmitApiKey<paths>

type OdptClient = Client<OmitApiKeyFromPaths>

export type { OmitApiKeyFromPaths as paths, OdptClient }
