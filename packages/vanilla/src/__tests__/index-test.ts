import { expect, test } from '@jest/globals'
import { loadParallel } from '../index'
import { ParallelConfig } from '../types'

declare global {
  interface Window {
    config: ParallelConfig
  }
}

global.window.Parallel = {
  get _config() {
    return window.config
  },
  init: ({ on_init, ...params }: ParallelConfig) => {
    window.config = params
    on_init?.()
  },
  api: () => null,
  login: () => null,
  logout: () => null,
  subscribe: () => null,
  showButton: () => null,
  hideButton: () => null,
  unsubscribe: () => null,
  getLoginStatus: () => null,
  subscribeWithButton: () => null,
}

test('Configuration is set correctly', async () => {
  const parallel = await loadParallel({
    client_id: 'test',
    flow_type: 'overlay',
  })
  expect(parallel?._config).toEqual(window.config)
})
