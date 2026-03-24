// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: [
			".next/**",
			"node_modules/**",
			"generated/**",
			"dist/**",
			"build/**",
		],
	},
	{
		rules: {
			semi: "error",
			"prefer-const": "error",
		},
	},
]);
