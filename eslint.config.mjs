import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{ ignores: ["dist/**", "**/dist/**"] },
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		ignores: ["**/*.test.{js,mjs,cjs,jsx}"],
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: { js },
		extends: ["js/recommended"],
		rules: {
			"react/react-in-jsx-scope": "off",
			"no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
		},
		languageOptions: { globals: globals.browser },
	},
	{
		settings: {
			react: { version: "detect" },
		},
	},
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat["jsx-runtime"],
	eslintConfigPrettier,
]);
