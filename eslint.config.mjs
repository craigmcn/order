import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js';
import pluginReact from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default defineConfig([
  {
    settings: { 
      react: { version: "detect" }
    }
  },
  { files: ["**/*.{js,jsx}"] },
  { files: ["**/*.{js,jsx}"], languageOptions: { globals: globals.browser } },
  { "files": ["**/*.{js,jsx}"], "plugins": { js }, "extends": ["js/recommended"] },
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      "indent": ["error", 2, { SwitchCase: 1 }],
      "jsx-quotes": ["error", "prefer-double"],
      "object-curly-spacing": ["error", "always"],
      "semi": "error",
    }
  },
  pluginReact.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "no-console": ["warn", { allow: ["error"] }],
      "no-nested-ternary": "warn",
      "no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true },
      ],
      "react/no-array-index-key": "error",
      "react/no-danger": "error",
      "react/react-in-jsx-scope": 0,
      "react/jsx-uses-react": 0,
      "jsx-a11y/no-autofocus": "warn",
    },
  },
  {
    // Note: there should be no other properties in this object
    ignores: ["node_modules", "dist", "coverage"],
  },
]);
