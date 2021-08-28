import React, { createContext, useContext, useEffect, useState } from 'react'

const BUTTON_IMG =
  'https://parallelmarkets.com/assets/images/login/medium-passport-button.svg'

const ParallelContext = createContext({ parallel: null })

export const ParallelProvider = ({ parallel, children, ...props }) => {
  return (
    <ParallelContext.Provider value={{ parallel }} {...props}>
      {children}
    </ParallelContext.Provider>
  )
}

const isPromise = (thing) => {
  return (
    thing !== null &&
    typeof thing === 'object' &&
    typeof thing.then === 'function'
  )
}

const wrapApiCall = (parallel, endpoint) => {
  return () => {
    return new Promise((resolve, reject) => {
      parallel.api(endpoint, resolve, reject)
    })
  }
}

export const useParallel = () => {
  const { parallel: promise } = useContext(ParallelContext)
  const [parallel, setParallel] = useState(null)
  const [loginStatus, setLoginStatus] = useState(null)
  const [error, setError] = useState(null)

  if (!isPromise(promise)) {
    console.warn(
      'You must call loadParallel and place the result in a <ParallelProvider parallel={result}> wrapper'
    )
    return {}
  }

  // on first mount, get and then set the parallel lib
  useEffect(() => {
    promise.then(setParallel)
  }, [])

  const handleLoginStatus = (result) => {
    // if there's an "error" key than an error occured
    setError(result.error ?? null)
    setLoginStatus(result)
  }

  useEffect(() => {
    if (!parallel) return

    // fire a request to check status if we don't yet know what it is
    if (!loginStatus) parallel.getLoginStatus(handleLoginStatus)

    // subscribe to any changes in login status to ensure that our loginStatus state
    // always contains the current login status
    parallel.subscribe('auth.statusChange', handleLoginStatus)
    return () => {
      parallel.unsubscribe('auth.statusChange', handleLoginStatus)
    }
  }, [parallel])

  // if we haven't loaded, return empty object
  if (!parallel) return {}

  return {
    parallel,
    loginStatus,
    getProfile: wrapApiCall(parallel, '/me'),
    getAccreditations: wrapApiCall(parallel, '/accreditations'),
    getIdentity: wrapApiCall(parallel, '/identity'),
    login: parallel.login,
    logout: parallel.logout,
  }
}

export const PassportButton = (props) => {
  const { parallel } = useParallel()

  if (!parallel) return null

  const handleClick = (e) => {
    e.preventDefault()
    parallel.login()
  }

  return (
    <a rel="nofollow" onClick={handleClick}>
      <img src={BUTTON_IMG} alt="Parallel Markets login button" {...props} />
    </a>
  )
}
