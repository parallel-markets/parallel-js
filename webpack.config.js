const webpack = require('webpack')
const path = require('path')
const env = process.env.NODE_ENV || 'development'

module.exports = [
  {
    target: ['web', 'es5'],
    entry: './src/index.js',
    mode: env,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceMap: true,
            },
          },
        },
      ],
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'parallel.js',
      library: {
        type: 'commonjs',
      },
    },
  },
  {
    target: ['web', 'es5'],
    entry: './src/index.js',
    mode: env,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceMap: true,
            },
          },
        },
      ],
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'parallel.esm.js',
      library: {
        type: 'module',
      },
    },
  },
  {
    target: ['web', 'es5'],
    entry: './src/react.js',
    mode: env,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceMap: true,
            },
          },
        },
      ],
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'react.esm.js',
      library: {        
        type: 'module',
      },
    },
  },
]
