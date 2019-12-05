module.exports = {
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		ecmaFeatures: { jsx: true },
	},
	extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
	plugins: ['prettier', 'react'],
	rules: { 'prettier/prettier': ['error'] },
	env: { browser: true, node: true, mocha: false, jest: false },
};
