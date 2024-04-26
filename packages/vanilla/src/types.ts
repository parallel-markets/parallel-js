export type EntityKind = 'individual' | 'business'

export type BusinessType =
  | 'Public Charity'
  | 'Private Foundation'
  | 'S Corporation'
  | 'C Corporation'
  | 'Irrevocable Trust'
  | 'Revocable Trust'
  | 'Family Office'
  | 'Limited Liability Company'
  | 'Limited Partnership'

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

// https://developer.parallelmarkets.com/docs/javascript/configuration#scopes
export type ParallelScope = 'profile' | 'accreditation_status' | 'identity'

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

export type IndividualProfile = {
  email: string
  first_name: string
  last_name: string
}

export type BusinessProfile = {
  name: string
  business_type: BusinessType
  primary_contact: IndividualProfile
}

export type ProfileApiResponse = {
  id: string
  type: EntityKind
  profile: IndividualProfile | BusinessProfile
  user_id: string
  user_profile: IndividualProfile
  user_providing_for: 'self' | 'controlled-business' | 'other-individual'
  access_expires_at: string | null
  access_revoked_by: 'subject' | 'partner' | 'system' | null
  available_scopes: Array<ParallelScope>
}

type GetProfileSuccessCallbackFunc = (_result: ProfileApiResponse) => void

type GetProfileFailureCallbackFunc = (_result: { error: unknown }) => void

type AuthSuccessCallbackFunc = (_result: AuthCallbackResult) => void

type AuthFailureCallbackFunc = (_result: { error: unknown }) => void

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
  external_id?: string
  expected_entity_id?: string
  expected_entity_type?: 'self' | BusinessType
  expected_business_name?: string
  partner_supporting?: string
  ref_code?: string
  redirect_uri_signature?: string
  required_entity_id?: string
}

export interface Parallel {
  init(_options: ParallelConfig): void
  getLoginStatus: (_callback: AuthSuccessCallbackFunc) => void
  getProfile: (_successFunc: GetProfileSuccessCallbackFunc, _errorFunc: GetProfileFailureCallbackFunc) => void
  login: (_options?: LoginOptions) => void
  logout: () => void
  unsubscribe: (_event: SubscribeEvents, _callback: SubscriptionHandler) => void
  subscribe: (_event: SubscribeEvents, _callback: SubscriptionHandler) => void
  showButton: () => void
  hideButton: () => void
  subscribeWithButton: (_successFunc: AuthSuccessCallbackFunc, _errorFunc: AuthFailureCallbackFunc) => void
  _appendLoadContext: (_context: string) => void
  _config: ParallelConfig
}

declare global {
  interface Window {
    // parallel.js must be loaded directly from app.parallelmarkets.com/sdk/v2/parallel.js
    // which places a `Parallel` object at the window level
    Parallel?: Parallel
  }
}
