/** @type {import('eslint').Linter.Config} */
module.exports = [
    {
      languageOptions: {
        parserOptions: {
          ecmaVersion: 12,
          sourceType: 'module',
        },
        globals: {
          console: 'readonly',
          // Add any other global variables here
        },
      },
      rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'eqeqeq': 'error',
        'no-alert': 'warn',
        'no-undef': 'error',
        'no-trailing-spaces': 'error',
        'indent': ['error', 2],
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        // Add other rules as needed
      },
    },
  ];
  