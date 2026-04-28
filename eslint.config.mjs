import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  {
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'indent': ['error', 2, { SwitchCase: 1 }],
      'jsx-quotes': ['error', 'prefer-double'],
      'object-curly-spacing': ['error', 'always'],
      'semi': 'error',
      'no-console': ['warn', { allow: ['error'] }],
      'no-nested-ternary': 'warn',
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'react/no-array-index-key': 'error',
      'react/no-danger': 'error',
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0,
      'jsx-a11y/no-autofocus': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  },
);
