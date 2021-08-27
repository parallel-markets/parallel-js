import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { loadParallel } from '@parallelmarkets/parallel-js'
import { ParallelProvider, useParallel, PassportButton } from '@parallelmarkets/parallel-js/dist/react.esm'

const AccreditationArea = () => {
  const { parallel, loginStatus  } = useParallel()  
 
  useEffect(() => {
    if (!loginStatus) return
    
    if (loginStatus.status === 'connected') {
      console.log('onLogin: ', loginStatus)
    } else if(loginStatus.status === 'not_authorized') {
      console.log('onError: ', loginStatus)
    }
  }, [loginStatus])

  return (
    <>
      <h1>{JSON.stringify(loginStatus || {})}</h1>
      {loginStatus && loginStatus.status !== 'connected' && <PassportButton />}
    </>
  )
}

const parallel = loadParallel({ client_id: '123', environment: 'demo', debug: true })

const App = () => (
  <ParallelProvider parallel={parallel}>
    <AccreditationArea />
  </ParallelProvider>
)

ReactDOM.render(<App />, document.getElementById("main"))
