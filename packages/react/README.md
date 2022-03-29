# Parallel Markets JavaScript React Components

[![npm version](https://img.shields.io/npm/v/@parallelmarkets/react.svg?style=flat-square)](https://www.npmjs.com/package/@parallelmarkets/react)

This library provides a loading wrapper for the [Parallel Markets JavaScript SDK](https://developer.parallelmarkets.com/docs/javascript) with React components.

## Installation

Use `npm` to install the Parallel JS SDK module and this React library:

```sh
$> npm install @parallelmarkets/vanilla @parallelmarkets/react
```

## Usage

The first step is to use the `loadParallel` function from the [@parallelmarkets/vanilla](https://www.npmjs.com/package/@parallelmarkets/vanilla) package to load the Parallel library.  This is then set in a `ParallelProvider` React context at the top level of your React application.

```js
import { loadParallel } from '@parallelmarkets/vanilla'
import { ParallelProvider } from '@parallelmarkets/react'

const parallel = loadParallel({ client_id: '123', environment: 'demo' })

const App = () => (
  <ParallelProvider parallel={parallel}>
    <AccreditationArea />
  </ParallelProvider>
)

ReactDOM.render(<App />, document.getElementById('main'))
```

Then, anywhere inside your application you can call the hook `useParallel` to get access to a number of useful properties:

 * `parallel`: This provides access to the [full JS SDK](https://developer.parallelmarkets.com/docs/javascript/sdk)
 * `loginStatus`: The current login status of the user. This is the result of a call to [`getLoginStatus()`](https://developer.parallelmarkets.com/docs/javascript/sdk), which may be null initially until a call to the API finishes.
 * `getProfile()`: A function that returns a `Promise` that will be resolved with profile information (from a call to the [Profile API](https://developer.parallelmarkets.com/docs/server/profile-api))
 * `getAccreditations()`: A function that returns a `Promise` that will be resolved with accreditation information (from a call to the [Accreditations API](https://developer.parallelmarkets.com/docs/server/accreditations-api))
 * `getIdentity()`: A function that returns a `Promise` that will be resolved with identity KYC/AML information (from a call to the [Identity API](https://developer.parallelmarkets.com/docs/server/identity-api))
 * `login()`: A shortcut to `parallel.login()`
 * `logout()`: A shortcut to `parallel.logout()`
 * `error`: Any error that resulted from getting the current login status on load

For instance:

```js
const ProfileInfo = () => {
  const [profileInfo, setProfileInfo] = useState(null)
  const { loginStatus, getProfile } = useParallel()

  useEffect(() => {
    // if the user is logged in, fetch profile info and set to state
    if (loginStatus?.status === 'connected') {
      getProfile().then(setProfileInfo)
    }
  }, [loginStatus])

  // once profileInfo is set it will be the same as the result of a call to the Profile API:
  // https://developer.parallelmarkets.com/docs/server/profile-api#response-parameters
  return profileInfo ? <div>Hello ${profileInfo.profile.first_name}!</div> : null
}
```

## Full Example

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

// start loading the parallel library with the given configuration information
// the resulting promise will be passed to the ParallelProvider
const parallel = loadParallel({ client_id: '123', environment: 'demo' })

const App = () => (
  <ParallelProvider parallel={parallel}>
    <AccreditationArea />
  </ParallelProvider>
)

ReactDOM.render(<App />, document.getElementById('main'))
```

## Embed Flow Type

While the "overlay" and "redirect" `flow_type` options will work fine with React, the "embed" option will not.  React recreates elements on render/re-render, causing any children iframe elements to be recreated, which results in reloading the URL in the `src` attribute. This causes a reload of the Parallel experience within the iframe, which is not an ideal experience for users.

[This issue on React’s Github](https://github.com/facebook/react/issues/858) has more info about the effect - but any movement of the `iframe` element in the DOM (including recreating, as React does) will produce a re-fetching of the `src` URL of the `iframe`, resulting in a re-render of the Parallel experience.

We strongly recommend using the "overlay" `flow_type` if you're using React.
