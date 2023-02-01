import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import ButtonImg from './medium-passport-button.svg'

import { ParallelApiRecord, loadParallel } from '@parallelmarkets/vanilla'
import type { AuthCallbackResult, Parallel } from '@parallelmarkets/vanilla'
import { AccreditationsApiResponse } from './accreditation_api_types'
import { ProfileApiResponse } from './profile_api_types'
import { BlockchainApiResponse } from './blockchain_api_types'
import { IdentityApiResponse } from './identity_api_types'

export * from './accreditation_api_types'
export * from './profile_api_types'
export * from './blockchain_api_types'
export * from './identity_api_types'

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

const isPromise = (thing: unknown): thing is PromiseLike<unknown> => {
  return typeof (thing as PromiseLike<unknown>)?.then === 'function'
}

// The Embed API works with callback functions. This wrapper converts them to promises.
const promisifyApiCall = <ResultType extends ParallelApiRecord>(parallel: Parallel, endpoint: string) => {
  return () => {
    // This promise resolves with the type of the API's Success Callback function's first Parameter
    return new Promise<ResultType>((resolve, reject) => {
      parallel.api(
        endpoint,
        (result) => {
          resolve(result as ResultType)
        },
        reject
      )
    })
  }
}

export const useParallel = () => {
  const { parallel: parallelPromise } = useContext(ParallelContext)
  const [parallel, setParallel] = useState<LoadParallelResult>(null)
  const [loginStatus, setLoginStatus] = useState<AuthCallbackResult>()
  const [error, setError] = useState<string>()

  // on first mount, get and then set the parallel lib
  useEffect(() => {
    if (isPromise(parallelPromise)) parallelPromise.then(setParallel)
  }, [])

  const handleLoginStatus = (result: AuthCallbackResult) => {
    // if there's an "error" key than an error occurred
    setError(result.error)
    setLoginStatus(result)
  }

  useEffect(() => {
    if (!parallel || !isPromise(parallelPromise)) return

    // fire a request to check status if we don't yet know what it is
    if (!loginStatus) parallel.getLoginStatus(handleLoginStatus)

    // subscribe to any changes in login status to ensure that our loginStatus state
    // always contains the current login status
    parallel.subscribe('auth.statusChange', handleLoginStatus)
    return () => {
      parallel.unsubscribe('auth.statusChange', handleLoginStatus)
    }
  }, [parallel])

  if (!isPromise(parallelPromise)) {
    console.warn('You must call loadParallel and place the result in a <ParallelProvider parallel={result}> wrapper')
    return {
      isLoaded: false,
    }
  }

  // if we haven't loaded, return empty object
  if (!parallel)
    return {
      isLoaded: false,
    }

  // React recreates elements on render/re-render, causing any children iframe elements
  // to reload their src attribute which causes a reload of the Parallel experience within
  // the iframe - which is a bad experience for users
  if (parallel?._config?.flow_type === 'embed') {
    console.error('flow_type must be "redirect" or "overlay" when using React')
  }

  return {
    isLoaded: true,
    parallel,
    error,
    loginStatus,
    getProfile: promisifyApiCall<ProfileApiResponse>(parallel, '/me'),
    getBlockchain: promisifyApiCall<BlockchainApiResponse>(parallel, '/blockchain'),
    getAccreditations: promisifyApiCall<AccreditationsApiResponse>(parallel, '/accreditations'),
    getIdentity: promisifyApiCall<IdentityApiResponse>(parallel, '/identity'),
    login: parallel.login,
    logout: parallel.logout,
  }
}

export const PassportButton = (props: typeof HTMLImageElement) => {
  const { parallel } = useParallel()

  if (!parallel) return null

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    parallel?.login()
  }

  return (
    <a role='button' rel='nofollow' onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={ButtonImg} alt='Parallel Markets login button' {...props} />
    </a>
  )
}
