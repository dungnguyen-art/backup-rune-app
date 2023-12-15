const avoidWindowOpenMsg = 'Use `openInNewTab` helper';
const avoidFetchMsg = 'Use `axios` instead for consistency with the rest of the project';

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    page: true,
    browser: true,
    context: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['./leather-styles'],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'deprecation'],
  rules: {
    // This rule helps highlight areas of the code that use deprecated
    // methods, such as implicit use of signed transactions
    'deprecation/deprecation': 'warn',
    'prefer-const': [
      'error',
      {
        ignoreReadBeforeAssign: false,
      },
    ],
    'no-restricted-globals': [
      'error',
      { name: 'open', message: avoidWindowOpenMsg },
      { name: 'fetch', message: avoidFetchMsg },
    ],
    'no-restricted-properties': [
      'error',
      {
        object: 'window',
        property: 'open',
        message: avoidWindowOpenMsg,
      },
      {
        object: 'globalThis',
        property: 'open',
        message: avoidWindowOpenMsg,
      },
      {
        object: 'window',
        property: 'close',
        message: 'Use `closeWindow` utility helper',
      },
      {
        object: 'window',
        property: 'fetch',
        message: avoidFetchMsg,
      },
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: 'try', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'import' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' }
    ],
    'comma-spacing': ["error", { "before": false, "after": true }],
    'object-curly-spacing': ["error", 'always'],
    '@typescript-eslint/no-floating-promises': ['warn'],
    '@typescript-eslint/no-unnecessary-type-assertion': ['warn'],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-assignment': [0],
    '@typescript-eslint/no-unsafe-return': [0],
    '@typescript-eslint/no-unsafe-call': [0],
    '@typescript-eslint/no-unsafe-member-access': [0],
    '@typescript-eslint/restrict-template-expressions': [0],
    '@typescript-eslint/explicit-module-boundary-types': [0],
    '@typescript-eslint/no-unnecessary-type-constraint': ['off'],
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/ban-types': ['error'],
    // This rule is off until we can enable tsconfig noUncheckedIndexedAccess
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/array-type': ['error'],
    'no-warning-comments': [0],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['error'],

    'react/function-component-definition': 'error',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['test/**', 'src/**/*.spec.ts'],
      rules: {},
    },
    {
      files: ['src/**/*'],
      excludedFiles: 'src/app/store/**',
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'react-redux',
                importNames: ['useSelector'],
                message: 'Selectors must be expored from the store via a hook',
              },
              {
                name: '@radix-ui/themes',
                importNames: ['Flex'],
                message: 'Layout components should be imported from leather-styles/jsx',
              },
            ],
          },
        ],
      },
    },
  ],
};
