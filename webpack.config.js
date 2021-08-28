const path = require('path')
const env = process.env.NODE_ENV || 'development'

module.exports = [
  {
    target: ['web', 'es5'],
    entry: './packages/parallel-js/src/index.js',
    mode: env,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, './packages/parallel-js/dist'),
      filename: 'parallel.js',
      library: {
        type: 'commonjs',
      },
    },
  },
  {
    target: ['web', 'es5'],
    entry: './packages/parallel-js/src/index.js',
    mode: env,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, './packages/parallel-js/dist'),
      filename: 'parallel.esm.js',
      library: {
        type: 'module',
      },
    },
  },
  {
    target: ['web', 'es5'],
    entry: './packages/parallel-react/src/index.js',
    mode: env,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, './packages/parallel-react/dist'),
      filename: 'parallel-react.esm.js',
      library: {
        type: 'module',
      },
    },
  },
]
