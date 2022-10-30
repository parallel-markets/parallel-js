import { loadParallel } from '@parallelmarkets/vanilla'

(async () => {
  // Replace client_id with your client id
  const Parallel = await loadParallel({ client_id: 'VpbHft3b8bbKTv2LyaUVS', environment: 'demo', flow_type: 'overlay' })
  
  Parallel.subscribeWithButton(() => {
    document.getElementById("message").innerHTML = 'Thanks for sharing your status.'
  }, (result) => {
    console.error(result)
    document.getElementById("message").innerHTML = 'Looks like there was an issue.'
  })
})();
