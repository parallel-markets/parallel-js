import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import { loadParallel } from '@parallelmarkets/vanilla'
import {
  ParallelProvider,
  useParallel,
  PassportButton,
} from '@parallelmarkets/react'

const AccreditationArea = () => {
  const { parallel, loginStatus } = useParallel()

  // we may render before the loginStatus is available
  if (!loginStatus) return null

  console.log(loginStatus)

  return (
    <>
      <h1>Status: {loginStatus.status}</h1>
      {loginStatus.status !== 'connected' ? (
        <PassportButton />
      ) : (
        <button onClick={parallel.logout}>Log Out</button>
      )}
    </>
  )
}

// replace the client_id with your client id
const parallel = loadParallel({ client_id: 'VpbHft3b8bbKTv2LyaUVS', environment: 'demo', flow_type: 'overlay' })

const App = () => (
  <ParallelProvider parallel={parallel}>
    <AccreditationArea />
  </ParallelProvider>
)

const app = document.getElementById('main')
const root = createRoot(app)
root.render(<App />)
