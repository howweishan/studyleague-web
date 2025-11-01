import js from '@eslint/js'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import sonarjs from 'eslint-plugin-sonarjs'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import process from 'node:process'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['**/*.config.{js,ts}', '**/dist/', 'dist/']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      },
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module'
      }
    }
  },

  // JS/TS Presets
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React & JSX Presets
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-compiler': reactCompiler,
      react: pluginReact
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: false,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true
        }
      ]
    }
  },

  // JSX Accessibility Presets
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    ...jsxA11y.flatConfigs.recommended,
    rules: {
      'jsx-a11y/no-autofocus': 'off'
    }
  },

  // SonarJS
  {
    ...sonarjs.configs.recommended,
    rules: {
      'sonarjs/prefer-read-only-props': 'off'
    }
  },

  // Unused Imports
  {
    plugins: {
      'unused-imports': unusedImports
    },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  },

  // Code Style and Formatting
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
]
