module.exports = {
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
		ecmaFeatures: { jsx: true },
	},
	extends: [
		'prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
	],
	plugins: ['prettier', 'react'],
	rules: { 'prettier/prettier': ['error'] },
	env: { browser: true, node: true, mocha: false, jest: false },
};
