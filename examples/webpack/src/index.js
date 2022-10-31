import { loadParallel } from '@parallelmarkets/vanilla'

window.logout = () => {
  window.Parallel.logout()
  document.getElementById('authResponse').innerHTML = ''
  document.getElementById('message').innerHTML = ''
}
;(async () => {
  // Replace client_id with your client id
  const scopes = ['profile', 'accreditation_status']
  const Parallel = await loadParallel({
    client_id: 'VpbHft3b8bbKTv2LyaUVS',
    environment: 'demo',
    flow_type: 'overlay',
    scopes,
  })

  Parallel.subscribeWithButton(
    ({ authResponse }) => {
      document.getElementById('message').innerHTML = 'You are now connected! <button onClick="logout()">Logout</button>'
      document.getElementById('authResponse').innerHTML = JSON.stringify(authResponse)
    },
    (result) => {
      console.error(result)
      document.getElementById('message').innerHTML = 'Looks like there was an issue.'
    }
  )
})()
