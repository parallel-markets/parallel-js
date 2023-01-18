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

export interface ParallelConfig {
  client_id?: string
  on_init?: () => void
  environment?: 'production' | 'demo'
  flow_type?: 'overlay' | 'embed' | 'redirect'
  scopes?: Array<string>
}

type AuthCallbackFunc = (result: AuthCallbackResult) => void

// TODO: implement this
type ApiCallbackFunc = (response: Record<string, unknown>) => void
type ApiErrorbackFunc = (reason: any) => void

type SubscribeEvents = 'auth.login' | 'auth.logout' | 'auth.statusChange' | 'auth.authResponseChange'
type EventHandler = (response: any) => void

export interface Parallel {
  init(options: ParallelConfig): void
  _config: ParallelConfig
  login: () => void
  logout: () => void
  subscribeWithButton: (successFunc: AuthCallbackFunc, errorFunc: AuthCallbackFunc) => void
  showButton: () => void
  hideButton: () => void
  api: (endpoint: string, callback: ApiCallbackFunc, errorback: ApiErrorbackFunc) => void
  subscribe: (event: SubscribeEvents, callback: EventHandler) => void
  unsubscribe: (event: SubscribeEvents, callback: EventHandler) => void
  getLoginStatus: (callback: AuthCallbackFunc) => void
}

declare global {
  interface Window {
    // parallel.js must be loaded directly from app.parallelmarkets.com/sdk/v1/parallel.js
    // which places a `Paralell` object at the window level
    Parallel?: Parallel
  }
}
