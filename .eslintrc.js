module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'sourceType': 'module',
    'project': './tsconfig.json',
  },
  'env': {
    'es6': true,
    'node': true
  },
  'plugins': ['@typescript-eslint', 'import'],
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  'rules': {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
    '@typescript-eslint/restrict-plus-operands': 'error',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'indent': ['error', 2],
    'quotes': ['error', 'double', { avoidEscape: true }],
    'semi': ['error', 'never'],
  }
}
