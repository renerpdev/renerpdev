import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import unicorn from "eslint-plugin-unicorn"
import unusedImports from "eslint-plugin-unused-imports"
import validateFilename from "eslint-plugin-validate-filename"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "dist/**",
      ".vercel/**",
      "*.config.js",
      "*.config.mjs",
      ".lintstagedrc.js"
    ]
  },
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "prettier"),
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: "readonly",
        JSX: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      unicorn,
      "unused-imports": unusedImports,
      "validate-filename": validateFilename
    },
    rules: {
      ...unicorn.configs.recommended.rules,
      "no-console": "warn",
      quotes: "off", // Handled by Prettier
      "comma-style": "warn",
      "no-unused-expressions": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "none", // Don't check unused args in type definitions
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ],
      "unicorn/filename-case": "off",
      "unicorn/import-style": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/prefer-global-this": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-sort": "off",
      "unicorn/prefer-module": "off",
      "validate-filename/naming-rules": [
        "error",
        {
          rules: [
            {
              case: "kebab",
              target: "**/app/**",
              excludes: ["_sections", "_components"],
              patterns: "^(page|layout|loading|error|not-found|route|template).tsx?$"
            },
            {
              case: "pascal",
              target: "**/components/**",
              excludes: ["hooks"]
            },
            {
              case: "pascal",
              target: "**/_sections/**.tsx"
            },
            {
              case: "pascal",
              target: "**/_components/**.tsx"
            },
            {
              case: "camel",
              target: "**/hooks/**",
              patterns: "^use"
            },
            {
              case: "camel",
              target: "**/providers/**",
              patterns: "^[a-zA-Z]*Provider"
            }
          ]
        }
      ]
    }
  }
]
