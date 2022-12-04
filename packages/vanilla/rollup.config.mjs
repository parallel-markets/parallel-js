import { babel } from '@rollup/plugin-babel'
import ts from 'rollup-plugin-typescript2'
import pkg from './package.json' assert { type: 'json' }

const config = {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    ts({ tsconfigOverride: { exclude: ['**/*-test.ts'] } }),
    babel({ babelHelpers: 'inline' }),
  ],
}

export default config
