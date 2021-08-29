module.exports = function (api) {
  const isEnvTest = process.env.NODE_ENV === 'test'
  api.cache(false)

  const presets = [
    'react-app',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: isEnvTest ? 'commonjs' : 'auto',
      },
    ],
  ]

  const plugins = [
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ]

  return {
    presets,
    plugins,
  }
}
