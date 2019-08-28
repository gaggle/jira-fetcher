module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'project': './tsconfig.json'
  },
  'env': {
    'es6': true,
    'node': true
  },
  'plugins': ['@typescript-eslint', 'import'],
  'extends': ['plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'plugin:import/typescript'],
  'rules': {
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
    'indent': ['error', 2],
    'quotes': ['error', 'double'],
    'semi': ['error', 'never'],
    'import/order': ['error', { 'newlines-between': 'always' }],
  }
}
