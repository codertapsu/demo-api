/** @type {import("prettier").Config} */
const config = {
	singleQuote: true,
	trailingComma: 'all',
	arrowParens: 'always',
	printWidth: 120,
	useTabs: false,
	tabWidth: 2,
	semi: true,
	bracketSpacing: true,
	bracketSameLine: true,
	endOfLine: 'lf',
	overrides: [
		{
			files: '.prettierrc.js',
			options: { parser: 'typescript' },
		},
		{
			files: ['**/*.css', '**/*.scss'],
			options: {
				bracketSameLine: false,
				singleQuote: false,
				singleAttributePerLine: true,
			},
		},
		{
			files: ['**/*.html'],
			options: {
				bracketSameLine: false,
				singleAttributePerLine: true,
				printWidth: 180,
			},
		},
	],
};

module.exports = config;
