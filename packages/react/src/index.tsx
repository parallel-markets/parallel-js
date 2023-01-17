import React, { createContext, ImgHTMLAttributes, PropsWithChildren, useContext, useEffect, useState } from 'react'
import ButtonImg from './medium-passport-button.svg'

// TODO: how should we share the Parallel type?
// pnpm workspace link in package, then import from vanilla?
import { loadParallel } from '../../vanilla/src'
import type { AuthCallbackResult, Parallel } from '../../vanilla/src/types'
// import type { Parallel } from '@parallelmarkets/vanilla'

type LoadParallelPromise = ReturnType<typeof loadParallel>
type LoadParallelResult = Awaited<ReturnType<typeof loadParallel>>
type ParallelContextValue = { parallel?: LoadParallelPromise }

const ParallelContext = createContext<ParallelContextValue>({ parallel: undefined })

type ParallelProviderProps = PropsWithChildren<{
  parallel: LoadParallelPromise
}>

export const ParallelProvider = ({ parallel, children, ...props }: ParallelProviderProps) => {
  return (
    <ParallelContext.Provider value={{ parallel }} {...props}>
      {children}
    </ParallelContext.Provider>
  )
}

const isThenable = (thing: any): thing is Promise<any> => {
  return typeof thing?.then === 'function'
}

const wrapApiCall = (parallel: Parallel, endpoint: string) => {
  return () => {
    return new Promise((resolve, reject) => {
      // TODO: fix Parallel['api'] type of remove reject option here
      parallel.api(endpoint, resolve, reject)
    })
  }
}

export const useParallel = () => {
  const { parallel: parallelPromise } = useContext(ParallelContext)
  const [parallel, setParallel] = useState<LoadParallelResult>(null)
  const [loginStatus, setLoginStatus] = useState(null)
  const [error, setError] = useState(null)

  // on first mount, get and then set the parallel lib
  useEffect(() => {
    if (isThenable(parallelPromise)) parallelPromise.then(setParallel)
  }, [])

  const handleLoginStatus = (result: AuthCallbackResult) => {
    // if there's an "error" key than an error occured
    setError(result.error ?? null)
    setLoginStatus(result)
  }

  useEffect(() => {
    if (!parallel || !isThenable(parallelPromise)) return

    // fire a request to check status if we don't yet know what it is
    if (!loginStatus) parallel.getLoginStatus(handleLoginStatus)

    // subscribe to any changes in login status to ensure that our loginStatus state
    // always contains the current login status
    parallel.subscribe('auth.statusChange', handleLoginStatus)
    return () => {
      parallel.unsubscribe('auth.statusChange', handleLoginStatus)
    }
  }, [parallel])

  if (!isThenable(parallelPromise)) {
    console.warn('You must call loadParallel and place the result in a <ParallelProvider parallel={result}> wrapper')
    return {}
  }

  // if we haven't loaded, return empty object
  if (!parallel) return {}

  // React recreates elements on render/re-render, causing any children iframe elements
  // to reload their src attribute which causes a reload of the Parallel experience within
  // the iframe - which is a bad experience for users
  if (parallel?._config?.flow_type === 'embed') {
    console.error('flow_type must be "redirect" or "overlay" when using React')
  }

  return {
    parallel,
    error,
    loginStatus,
    getProfile: wrapApiCall(parallel, '/me'),
    getBlockchain: wrapApiCall(parallel, '/blockchain'),
    getAccreditations: wrapApiCall(parallel, '/accreditations'),
    getIdentity: wrapApiCall(parallel, '/identity'),
    login: parallel.login,
    logout: parallel.logout,
  }
}

export const PassportButton = (props: typeof HTMLImageElement) => {
  const { parallel } = useParallel()

  if (!parallel) return null

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    parallel.login()
  }

  return (
    <a role='button' rel='nofollow' onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={ButtonImg} alt='Parallel Markets login button' {...props} />
    </a>
  )
}