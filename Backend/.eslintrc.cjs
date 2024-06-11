module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // adding it at last to override other configs
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    camelcase: 0,
    'no-alert': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'object-shorthand': 0,
  },
  settings: {},
};
