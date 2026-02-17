import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: { js },
		extends: ["js/recommended"],
		rules: {
			"react/react-in-jsx-scope": "off",
		},
		languageOptions: { globals: globals.browser },
	},
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat["jsx-runtime"],
	eslintConfigPrettier,
]);
