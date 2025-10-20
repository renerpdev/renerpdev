import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import validateFilename from 'eslint-plugin-validate-filename';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      '.vercel/**',
      '*.config.js',
      '*.config.mjs',
      '.lintstagedrc.js',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    plugins: {
      unicorn,
      'unused-imports': unusedImports,
      'validate-filename': validateFilename,
    },
    rules: {
      ...unicorn.configs.recommended.rules,
      'no-console': 'warn',
      quotes: 'warn',
      'comma-style': 'warn',
      'no-unused-expressions': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'unicorn/filename-case': 'off',
      'unicorn/import-style': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-sort': 'off',
      'unicorn/prefer-module': 'off',
      'import/no-anonymous-default-export': 'warn',
      'validate-filename/naming-rules': [
        'error',
        {
          rules: [
            {
              case: 'kebab',
              target: '**/app/**',
              excludes: ['_sections'],
              patterns: '^(page|layout|loading|error|not-found|route|template).tsx?$',
            },
            {
              case: 'pascal',
              target: '**/components/**',
              excludes: ['hooks'],
            },
            {
              case: 'pascal',
              target: '**/_sections/**.tsx',
            },
            {
              case: 'camel',
              target: '**/hooks/**',
              patterns: '^use',
            },
            {
              case: 'camel',
              target: '**/providers/**',
              patterns: '^[a-zA-Z]*Provider',
            },
          ],
        },
      ],
    },
  },
];
