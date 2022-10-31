import { babel } from '@rollup/plugin-babel'
import pkg from './package.json' assert { type: 'json' }

const config = {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [babel({ babelHelpers: 'inline' })],
}

export default config
