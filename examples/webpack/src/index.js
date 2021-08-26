import { loadParallel } from '@parallelmarkets/parallel-js'

(async () => {
  const Parallel = await loadParallel({ client_id: '123', environment: 'demo', verbose: true })
  
  Parallel.subscribeWithButton(() => {
    document.getElementById("message").innerHTML = 'Thanks for sharing your status.'
  }, () => {
    document.getElementById("message").innerHTML = 'Looks like there was an issue.'
  })
})();
