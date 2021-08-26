var OFF = 0,
  WARN = 1,
  ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'node/no-callback-literal': OFF,
    'camelcase': OFF,
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'sort-vars': ERROR,
    'no-debugger': process.env.NODE_ENV === 'development' ? OFF : ERROR,
  }
}
