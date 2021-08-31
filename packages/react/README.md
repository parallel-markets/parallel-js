# Parallel Markets JavaScript React Components

[![npm version](https://img.shields.io/npm/v/@parallelmarkets/react.svg?style=flat-square)](https://www.npmjs.com/package/@parallelmarkets/react)

This library provides a loading wrapper for the [Parallel Markets JavaScript SDK](https://developer.parallelmarkets.com/docs/javascript) with React components.

## Installation

Use `npm` to install the Parallel JS SDK module and this React library:

```sh
$> npm install @parallelmarkets/vanilla @parallelmarkets/react
```

## Usage

```js
import { loadParallel } from '@parallelmarkets/vanilla'
import { ParallelProvider, useParallel, PassportButton } from '@parallelmarkets/react'

const AccreditationArea = () => {
  // the parallel variable provides access to the full SDK available at
  // https://developer.parallelmarkets.com/docs/javascript/sdk
  const { parallel, loginStatus } = useParallel()

  // we may render before the loginStatus is available
  if (!loginStatus) return null

  return (
    <>
      <h1>Status: {loginStatus.status}</h2>
      {/* Only show the login button if the user hasn't logged in yet */}
      {loginStatus.status !== 'connected' ? (
        <PassportButton />
      ) : (
        <button onClick={parallel.logout}>Log Out</button>
      )}
    </>
  )
}

// start loadin the parallel library with the given configuration information
// the resulting promise will be passed to the ParallelProvider
const parallel = loadParallel({ client_id: '123', environment: 'demo' })

const App = () => (
  <ParallelProvider parallel={parallel}>
    <AccreditationArea />
  </ParallelProvider>
)
```
