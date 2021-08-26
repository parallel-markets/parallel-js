# Parallel Markets JavaScript SDK ES Module

[![npm version](https://img.shields.io/npm/v/@parallelmarkets/parallel-js.svg?style=flat-square)](https://www.npmjs.com/package/@parallelmarkets/parallel-js)

This library provides a loading wrapper for the [Parallel Markets JavaScript SDK](https://developer.parallelmarkets.com/docs/javascript) as an ES module.

## Installation

Use `npm` to install the Parallel JS SDK module:

```sh
$> npm install @parallelmarkets/parallel-js
```

## Usage

```js
import { loadParallel } from '@parallelmarkets/parallel-js'

// load the parallel library with the given configuration information
const parallel = await loadParallel({ client_id: '123', environment: 'demo' })

// any element with the "parallel-login-button" class will render a button
parallel.showButton()
```

Once the library is loaded, you can immediately utilize [the SDK](https://developer.parallelmarkets.com/docs/javascript/sdk).
