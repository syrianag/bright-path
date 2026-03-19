// eslint.config.js
import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
	{
		ignores: ["node_modules/**", ".next/**", "dist/**", "out/**", "coverage/**"],
	},
	{
		files: ["src/**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
		},
		rules: {
			semi: ["error", "always"],
			"prefer-const": "error",
		},
	},
]);
