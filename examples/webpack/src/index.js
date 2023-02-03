import { loadParallel } from '@parallelmarkets/vanilla'

window.logout = () => {
  window.Parallel.logout()
  document.getElementById('authResponse').innerHTML = ''
  document.getElementById('message').innerHTML = ''
}

const scopes = ['profile', 'accreditation_status']

const authSuccess = ({ authResponse }, parallel) => {
  const msg = document.getElementById('message')
  msg.innerHTML = 'You are now connected! <button onClick="logout()">Logout</button>'

  document.getElementById('authResponse').innerHTML = JSON.stringify(authResponse)

  if (!scopes.includes('accreditation_status')) return

  parallel.api('/accreditations', ({ accreditations }) => {
    if (accreditations.some(({ status }) => status === 'current')) {
      msg.innerHTML += ' Also you are accredited!  Congrats!'
    } else {
      msg.innerHTML += ' Also, looks like you are not accredited. :('
    }
  })
}

const authFailure = (result) => {
  console.error(result)
  document.getElementById('message').innerHTML = 'Looks like there was an issue.'
}

const run = async () => {
  // Replace client_id with your client id
  const parallel = await loadParallel({
    client_id: 'VpbHft3b8bbKTv2LyaUVS',
    environment: 'demo',
    flow_type: 'overlay',
    scopes,
  })

  parallel?.subscribeWithButton((result) => authSuccess(result, parallel), authFailure)
}

run()
