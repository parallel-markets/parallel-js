import { loadParallel } from '../index'

global.Parallel = {
  config: null,
  init: ({ on_init, ...params }) => {
    global.Parallel.config = params
    on_init()
  },
}

test('Configuration is set correctly', async () => {
  const config = { test: 'test' }
  const parallel = await loadParallel(config)
  expect(parallel.config).toEqual(config)
})
