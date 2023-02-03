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

type AuthSuccessCallbackFunc = (result: AuthCallbackResult) => void
type AuthFailureCallbackFunc = (result: { error: unknown }) => void

// TODO: implement this
export type ParallelApiRecord = Record<string, any>
export type ParallelApiSuccessCallback = (response: ParallelApiRecord) => void
export type ParallelApiErrorCallback = (reason: any) => void

type SubscribeEvents = 'auth.login' | 'auth.logout' | 'auth.statusChange' | 'auth.authResponseChange'
type EventHandler = (response: any) => void

export interface Parallel {
  init(options: ParallelConfig): void
  _config: ParallelConfig
  login: () => void
  logout: () => void
  subscribeWithButton: (successFunc: AuthSuccessCallbackFunc, errorFunc: AuthFailureCallbackFunc) => void
  showButton: () => void
  hideButton: () => void
  api: (endpoint: string, callback: ParallelApiSuccessCallback, errorback: ParallelApiErrorCallback) => void
  subscribe: (event: SubscribeEvents, callback: EventHandler) => void
  unsubscribe: (event: SubscribeEvents, callback: EventHandler) => void
  getLoginStatus: (callback: AuthSuccessCallbackFunc) => void
}

declare global {
  interface Window {
    // parallel.js must be loaded directly from app.parallelmarkets.com/sdk/v1/parallel.js
    // which places a `Paralell` object at the window level
    Parallel?: Parallel
  }
}
