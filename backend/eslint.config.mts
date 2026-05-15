import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    ignores: ["node_modules/**", "dist/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-var": "error",
      "no-console": "warn",
    },
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-var": "error",
      "no-console": "warn",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
    },
  },
  eslintConfigPrettier,
]);
