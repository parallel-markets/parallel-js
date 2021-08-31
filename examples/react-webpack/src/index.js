import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

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
const parallel = loadParallel({ client_id: '123', environment: 'demo' })

const App = () => (
  <ParallelProvider parallel={parallel}>
    <AccreditationArea />
  </ParallelProvider>
)

ReactDOM.render(<App />, document.getElementById('main'))
