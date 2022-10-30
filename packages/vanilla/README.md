# Parallel Markets JavaScript SDK ES Module

![CI Status](https://github.com/parallel-markets/parallel-js/workflows/ci/badge.svg)
[![npm version](https://img.shields.io/npm/v/@parallelmarkets/vanilla.svg?style=flat-square)](https://www.npmjs.com/package/@parallelmarkets/vanilla)

This library provides a loading wrapper for the [Parallel Markets JavaScript SDK](https://developer.parallelmarkets.com/docs/javascript) as an ES module.

## Installation

Use `npm` to install the Parallel JS SDK module:

```sh
$> npm install @parallelmarkets/vanilla
```

## Usage

```js
import { loadParallel } from '@parallelmarkets/vanilla'

// load the parallel library with the given configuration information
const parallel = await loadParallel({ client_id: '123', environment: 'demo' })

// any element with the "parallel-login-button" class will render a button
parallel.showButton()
```

Once the library is loaded, you can immediately utilize [the SDK](https://developer.parallelmarkets.com/docs/javascript/sdk).
