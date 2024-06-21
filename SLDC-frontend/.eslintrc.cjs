module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },

    extends: [
      'airbnb',
      'airbnb/hooks',
      'airbnb-typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',  //adding it at last to override other configs
    ],
    ignorePatterns: ['.eslintrc.cjs'],
    parserOptions: {
      parser: '@typescript-eslint/parser',
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: [
      'react',
      '@typescript-eslint',
      'prettier'
    ],
    rules: {
      'react/react-in-jsx-scope': 0,
      'import/prefer-default-export': 0,
      'react/function-component-definition': [
        2,
        {
          namedComponents: ['arrow-function', 'function-declaration'],
          unnamedComponents: 'arrow-function',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/explicit-member-accessibility': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/typedef': [
      'warn',
      {
        arrowParameter: true,
        variableDeclaration: true,
        memberVariableDeclaration: true,
        objectDestructuring: true,
        arrayDestructuring: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclarationIgnoreFunction: true,
      },
    ],
    },
};
