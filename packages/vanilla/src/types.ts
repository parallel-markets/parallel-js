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
  raw_config?: Record<string, any>
}

type AuthSuccessCallbackFunc = (_result: AuthCallbackResult) => void
type AuthFailureCallbackFunc = (_result: { error: unknown }) => void

// TODO: implement this
export type ParallelApiRecord = Record<string, any>
export type ParallelApiSuccessCallback = (_response: ParallelApiRecord) => void
export type ParallelApiErrorCallback = (_reason: any) => void

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
type SubscriptionHandler = (_response: SubscriptionEvent) => void

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
  init(_options: ParallelConfig): void
  _config: ParallelConfig
  login: (_options?: LoginOptions) => void
  logout: () => void
  subscribeWithButton: (_successFunc: AuthSuccessCallbackFunc, _errorFunc: AuthFailureCallbackFunc) => void
  showButton: () => void
  hideButton: () => void
  api: (_endpoint: string, _callback: ParallelApiSuccessCallback, _errback: ParallelApiErrorCallback) => void
  subscribe: (_event: SubscribeEvents, _callback: SubscriptionHandler) => void
  unsubscribe: (_event: SubscribeEvents, _callback: SubscriptionHandler) => void
  getLoginStatus: (_callback: AuthSuccessCallbackFunc) => void
  _appendLoadContext: (_context: string) => void
}

declare global {
  interface Window {
    // parallel.js must be loaded directly from app.parallelmarkets.com/sdk/v2/parallel.js
    // which places a `Paralell` object at the window level
    Parallel?: Parallel
  }
}
