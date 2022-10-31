import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { loadParallel } from '@parallelmarkets/vanilla'
import { ParallelProvider, useParallel, PassportButton } from '@parallelmarkets/react'

// replace the client_id with your client id
const scopes = ['profile', 'accreditation_status']
const parallel = loadParallel({ client_id: 'VpbHft3b8bbKTv2LyaUVS', environment: 'demo', flow_type: 'overlay', scopes })

const ProfileBox = () => {
  const { loginStatus, getProfile } = useParallel()
  const [profileResponse, setProfileResponse] = useState(null)

  useEffect(() => {
    // if the user is now connected, then fetch profile info
    if (loginStatus?.status === 'connected') getProfile().then(setProfileResponse)
  }, [loginStatus])

  if (!profileResponse) return null

  if (profileResponse.type === 'individual') {
    const { profile: { first_name, last_name, email } } = profileResponse
    return <h3>{first_name} {last_name} &lt;{email}&gt;</h3>
  } else {
    const { profile: { name } } = profileResponse
    return <h3>{name} (business)</h3>
  }
}

const ConnectionArea = () => {
  const { parallel, loginStatus } = useParallel()

  // we may render before the loginStatus is available
  if (!loginStatus) return null

  // if we got the status, but it's not connected, show the connection button
  if (loginStatus.status !== 'connected') return <PassportButton />

  return (
    <>
      <h2>Connection successful!</h2>
      <ProfileBox />
      <div style={{ padding: '15px', margin: '15px', backgroundColor: '#eee', overflow: 'wrap', overflowWrap: 'break-word' }}>
        <h3>Authentication Response Parameters:</h3>
        <ul>
          {Object.entries(loginStatus.authResponse).map(([key, value], i) => <li key={i}><b>{key}:</b> {value}</li>)}
        </ul>
      </div>
      <button onClick={parallel.logout}>Log Out</button>
    </>
  )
}

const App = () => (
  <ParallelProvider parallel={parallel}>
    <ConnectionArea />
  </ParallelProvider>
)

const app = document.getElementById('main')
const root = createRoot(app)
root.render(<App />)
