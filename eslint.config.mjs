import typescriptEslintParser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';
import {defineConfig} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
	{
		files: ['**/*.ts'],
		languageOptions: {
			globals: globals.builtin,
			parser: typescriptEslintParser,
		},
		plugins: {
			unicorn,
		},
		extends: [unicorn.configs.recommended],
		rules: {

		},
	},
]);