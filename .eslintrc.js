module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'mantine'
  ],
  rules: {
    'no-console': 'warn',
    // ...existing rules
  },
  settings: {
    react: {
      version: 'detect',
    },
    next: {
      rootDir: '.',
    },
  },
};
