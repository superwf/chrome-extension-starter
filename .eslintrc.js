/* eslint-disable @typescript-eslint/no-var-requires */
// const tsconfig = require('./tsconfig.json')

/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'react', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:css-modules/recommended',
    'prettier',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/recommended',
  ],

  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        eslintIntegration: true,
        stylelintIntegration: true,
        printWidth: 120,
        useTabs: false,
        tabWidth: 2,
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
        jsxBracketSameLine: false,
        endOfLine: 'auto',
      },
    ],
    'import/extensions': ['error', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      json: 'always',
    }],
    'import/order': ['error', { 'newlines-between': 'always' }],

    'import/prefer-default-export': 0,
    'linebreak-style': 0,
  },
  // settings: {
  //   'import/resolver': {
  //     alias: {
  //       map: pathAlias,
  //       extensions: ['.ts', '.js', '.jsx', '.json', '.tsx', '.d.ts'],
  //     },
  //   },
  // },
}
