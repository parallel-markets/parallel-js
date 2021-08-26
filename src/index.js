const V1_URL = 'https://app.parallelmarkets.com/sdk/v1/parallel.js'

const findScript = () =>
  [...document.querySelectorAll(`script[src^="${V1_URL}"]`)][0] ?? null

const addScript = () => {
  const script = document.createElement('script')
  script.src = V1_URL

  const headOrBody = document.head || document.body
  if (!headOrBody)
    throw new Error(
      'Parallel JS cannot be added to page with no <head/> or <body/> element'
    )

  headOrBody.appendChild(script)
  return script
}

let parallelPromise = null

const loadScript = () => {
  // Load parallel script at most once
  if (parallelPromise !== null) return parallelPromise

  parallelPromise = new Promise((resolve, reject) => {
    // if we were imported on a server immediately return
    if (typeof window === 'undefined') {
      resolve(null)
      return
    }

    if (window.Parallel) {
      resolve(window.Parallel)
      return
    }

    try {
      let script = findScript()
      if (!script) script = addScript()

      script.addEventListener('load', () => {
        if (window.Parallel) {
          resolve(window.Parallel)
        } else {
          reject(new Error('Parallel JS SDK is not available'))
        }
      })

      script.addEventListener('error', () => {
        reject(new Error('Failed to load Parallel JS SDK'))
      })
    } catch (error) {
      reject(error)
      return
    }
  })

  return parallelPromise
}

let loadCalled = false

export const loadParallel = (config) => {
  if (loadCalled)
    return Promise.reject(
      new Error('You cannot call loadParallel more than once')
    )
  loadCalled = true

  return loadScript().then((Parallel) => {
    if (!Parallel) return null

    Parallel.init(config)
    return Parallel
  })
}
