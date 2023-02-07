import { type BusinessType } from './common_api_types'

/* eslint-disable @typescript-eslint/no-explicit-any */
type AuthResponse = {
  access_token: string
  token_type: 'bearer'
  expires_in: number
  refresh_token: string
  refresh_expires_in: number
}

export type AuthCallbackResult = {
  authResponse?: AuthResponse
  status: 'not_authorized' | 'unknown' | 'connected'
  error?: string
  errorDescription?: string
}

// https://developer.parallelmarkets.com/docs/server/scopes
export type ParallelScope = 'profile' | 'accreditation_status' | 'identity' | 'blockchain'

// https://developer.parallelmarkets.com/docs/javascript/configuration
type EmbedParallelConfig = {
  flow_type: 'embed'
  embed_into_id: string
}
type OverlayRedirectParallelConfig = {
  flow_type: 'overlay' | 'redirect'
}
export type ParallelConfig = (EmbedParallelConfig | OverlayRedirectParallelConfig) & {
  client_id?: string
  environment?: 'production' | 'demo'
  force_accreditation_check?: boolean
  force_identity_check?: boolean
  scopes?: Array<ParallelScope>
  show_dismiss_button?: boolean
  identity_claim_override_id?: number
  verbose?: boolean
  on_init?: () => void
  raw_config?: Record<string, symbol>
}

type AuthSuccessCallbackFunc = (result: AuthCallbackResult) => void
type AuthFailureCallbackFunc = (result: { error: unknown }) => void

// TODO: implement this
export type ParallelApiRecord = Record<string, any>
export type ParallelApiSuccessCallback = (response: ParallelApiRecord) => void
export type ParallelApiErrorCallback = (reason: any) => void

type SubscribeEvents = 'auth.login' | 'auth.logout' | 'auth.statusChange' | 'auth.authResponseChange'
type OAuthErrorCode =
  | 'invalid_request'
  | 'invalid_client'
  | 'invalid_grant'
  | 'unauthorized_client'
  | 'unsupported_grant_type'
type SubscriptionEvent = {
  status: 'not_authorized' | 'unknown' | 'connected'
  error?: OAuthErrorCode
  errorDescription?: string
  authResponse?: {
    expires_in: number
    token_type: 'bearer'
    access_token: string
    refresh_token: string
    refresh_expires_in: number
  }
}
type SubscriptionHandler = (response: SubscriptionEvent) => void

export interface LoginOptions {
  email?: string
  first_name?: string
  last_name?: string
  expected_entity_id?: string
  expected_entity_type?: 'self' | BusinessType
  expected_business_name?: string
  partner_supporting?: string
}

export interface Parallel {
  init(options: ParallelConfig): void
  _config: ParallelConfig
  login: (options?: LoginOptions) => void
  logout: () => void
  subscribeWithButton: (successFunc: AuthSuccessCallbackFunc, errorFunc: AuthFailureCallbackFunc) => void
  showButton: () => void
  hideButton: () => void
  api: (endpoint: string, callback: ParallelApiSuccessCallback, errorback: ParallelApiErrorCallback) => void
  subscribe: (event: SubscribeEvents, callback: SubscriptionHandler) => void
  unsubscribe: (event: SubscribeEvents, callback: SubscriptionHandler) => void
  getLoginStatus: (callback: AuthSuccessCallbackFunc) => void
}

declare global {
  interface Window {
    // parallel.js must be loaded directly from app.parallelmarkets.com/sdk/v1/parallel.js
    // which places a `Paralell` object at the window level
    Parallel?: Parallel
  }
}
