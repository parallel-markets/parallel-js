const isEnvTest = process.env.NODE_ENV === 'test'

module.exports = {
  presets: [
    ['@babel/preset-env',
      {
      useBuiltIns: 'entry',
      corejs: 3,
      modules: isEnvTest ? 'commonjs' : 'auto'
      }
    ],
  ]
}