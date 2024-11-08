import type { paths } from 'odpt-openapi-generated'

const API_KEY_PROPERTY_NAME = 'acl:consumerKey' as const

type ApiKeyPropertyName = typeof API_KEY_PROPERTY_NAME
type UsedHttpMethod = 'get'

type IsEmptyObject<T> = T extends object ? (keyof T extends never ? true : false) : false
type RemoveEmptyQuery<T extends object> = {
  [K in keyof T as K extends 'query' ? (IsEmptyObject<T[K]> extends true ? never : K) : K]: T[K]
}

type OmitApiKey<Path extends object> = {
  [Endpoint in keyof Path]: {
    [Property in keyof Path[Endpoint]]: Property extends UsedHttpMethod
      ? {
          [MethodProperty in keyof Path[Endpoint][Property]]: MethodProperty extends 'parameters'
            ? RemoveEmptyQuery<{
                [Parameter in keyof Path[Endpoint][Property][MethodProperty]]: Parameter extends 'query'
                  ? Omit<Path[Endpoint][Property][MethodProperty][Parameter], ApiKeyPropertyName>
                  : Path[Endpoint][Property][MethodProperty][Parameter]
              }>
            : Path[Endpoint][Property][MethodProperty]
        }
      : Path[Endpoint][Property]
  }
}

type OmitApiKeyFromPaths = OmitApiKey<paths>

export type { OmitApiKeyFromPaths as paths }
