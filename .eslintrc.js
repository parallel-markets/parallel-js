var OFF = 0,
  WARN = 1,
  ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'react-hooks/exhaustive-deps': OFF,
    'react/prop-types': OFF,
    'node/no-callback-literal': OFF,
    'n/no-callback-literal': OFF,
    camelcase: OFF,
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'sort-vars': ERROR,
    'no-debugger': process.env.NODE_ENV === 'development' ? OFF : ERROR,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
