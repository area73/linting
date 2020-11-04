/* eslint-disable global-require */
const ownRules = [
  './rules/best-practices',
  './rules/errors',
  './rules/es6',
  './rules/imports',
  './rules/node',
  './rules/strict',
  './rules/style',
  './rules/variables',
  './rules/react',
  './rules/lodash',
  './rules/react-a11y',
].map(require.resolve);

let mustLintTs = true;

try {
  // check if project has typescript configured so we can load typescript parser
  // eslint-disable-next-line no-unused-vars, import/no-extraneous-dependencies
  const a = require('typescript');
} catch (e) {
  mustLintTs = false;
}

let tsOverrides = [];

if (mustLintTs) {
  const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');

  const localTsRules = require('./rules/ts');

  const tsRules = {
    ...tsEslintPlugin.configs.recommended.rules,
    ...tsEslintPlugin.configs['recommended-requiring-type-checking'].rules,
    ...localTsRules.rules,
  };

  tsOverrides = [
    {
      files: ['**/*.ts', '**/*.tsx'],
      excludedFiles: '*.d.ts',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'jest', 'prettier'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: tsRules,
    },
  ];
}

module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest', 'prettier'],
  extends: [
    ...ownRules,
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
    'prettier/react',
    ...(mustLintTs ? ['prettier/@typescript-eslint'] : []),
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    strict: 'error',
  },
  overrides: tsOverrides,
};
