// ponytail: minimal Astro ESLint config, stdlib-first
import typescript from '@typescript-eslint/parser'
import astro from 'eslint-plugin-astro'

export default [
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: typescript,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },
]
