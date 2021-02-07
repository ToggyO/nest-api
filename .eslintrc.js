module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier'
    // 'import'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': ['error', { 'allow': ['methods','constructors'] }],
    'no-console': 'warn', // Remember, this means error!
    // 'import/no-unresolved': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 'error',
    'curly': ['warn', 'all'],
    'func-names': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { 'code': 120 }],
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-tabs': 'off',
    'no-underscore-dangle': 'off',
  },
};
