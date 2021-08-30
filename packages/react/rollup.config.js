import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import pkg from './package.json'

const config = {
  input: 'src/index.jsx',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    resolve(), // so Rollup can find `react, etc.`
    commonjs(), // so Rollup can convert `react and other CommonJS modules` to an ES module
    babel({ babelHelpers: 'runtime' }),
  ],
  external: ['react', 'react-dom'],
}

export default config
