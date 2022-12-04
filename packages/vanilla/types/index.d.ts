export type AuthResponse = {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
}

export type AuthCallbackResult = {
  authResponse?: AuthResponse;
  status: 'not_authorized' | 'unknown' | 'connected';
  error?: string;
  errorDescription?: string;
}

export type AuthCallbackFunc = (result: AuthCallbackResult) => void;

export interface APIResponse {};

export type APICallbackFunc = (response: APIResponse) => void;

export interface Parallel {
  init(options: ParallelConfig): void;
  _config: ParallelConfig;
  login: () => void;
  logout: () => void;
  subscribeWithButton: (successFunc: AuthCallbackFunc, errorFunc: AuthCallbackFunc) => void;
  showButton: () => void;
  hideButton: () => void;
  api: (endpoint: string, callback: APICallbackFunc) => void;
  subscribe: (event: string, callback: (result?: any) => void) => void;
  unsubscribe: (event: string, callback: (result?: any) => void) => void;
  getLoginStatus: (callback: AuthCallbackFunc) => void;
}

declare global {
  interface Window {
    // parallel.js must be loaded directly from app.parallelmarkets.com/sdk/v1/parallel.js
    // which places a `Paralell` object at the window level
    Parallel?: Parallel;
  }
}

export interface ParallelConfig {
  client_id?: string;
  on_init?: () => void;
  environment?: 'production' | 'demo';
  flow_type?: 'overlay' | 'embed' | 'redirect';
  scopes?: Array<string>;
}

export type LoadParallel = (options: ParallelConfig) => Promise<Parallel | null>;

export const loadParallel: (options: ParallelConfig) => Promise<Parallel | null>;
