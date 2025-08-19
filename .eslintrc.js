module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // Basic rules
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': 'off', // Turn off base rule
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],

    // React rules
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    'web-build/',
    'dist/',
    '*.config.js',
    'metro.config.js',
    'babel.config.js',
    '.expo/',
    'coverage/',
  ],
};
