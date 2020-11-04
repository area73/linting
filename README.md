# @area73/eslint-linting

ESLint config for both TS and JS, base on Cabify dev rules

## How to configure a JS project

1. Install ESLint and dependencies

```sh
yarn install @area73/eslint-config eslint prettier eslint-import-resolver-jest
```

2. Create `.eslintrc` file in the root of your project

```json
{
  "extends": ["@area73"]
}
```

3. Add the lint task in your `package.json`

```json
...
"scripts": {
  "lint": "eslint . --ext ts,tsx"
}
```

## How to configure a TS project

1. Install ESLint and dependencies

```sh
yarn install @area73/eslint-config eslint prettier eslint-import-resolver-jest eslint-import-resolver-typescript
```

2. Create `.eslintrc.js` file in the root of your project

```json
{
  "extends": ["@area73"],
  "parserOptions": {
    "project": "./tsconfig.eslint.json"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
```

3. Add a `./tsconfig.eslint.json` to the root of your project. NOTE: it is important that your
   `tsconfig.eslint.json` file includes the same files that you are going to lint, or it will fail
   and make linting so slow.

```json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*", "test/**/*"] // remember to import also your test files if you want to lint them
}
```

4. Add the lint task in your `package.json`

```json
...
"scripts": {
  "lint": "eslint . --ext ts,tsx"
}
```

### A note on performance in TS projects

There is an known issue that may affect linting times in projects with TS. If you note that your
linting time is not acceptable, there is a workaround to improve it a lot, but it implies to disable
some rules. If you can live without them, just make these changes in your `.eslintrc.js` config

```json
{
  "extends": ["@area73"],
  // remove the "project" field (if you don't have any other parserOptions you can remove the full section)
  "parserOptions": {},
  "rules": {
    // this rules depend on project field, so they must be disabled to make linting much faster
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/prefer-includes": "off",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "@typescript-eslint/prefer-string-starts-ends-with": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/unbound-method": "off"
  }
}
```
### Migration
#### From 7 > 8

The biggest change here is we adopted new major version of `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`. This upgrade comes with a ton of changes related with deprecated rules such: 
 - `@typescript-eslint/class-name-casing`
 - `@typescript-eslint/interface-name-prefix`
 - `@typescript-eslint/generic-type-naming`
 - `@typescript-eslint/camelcase`
 - `@typescript-eslint/ban-ts-ignore`

New stricter rules were enabled from the suite of recommended ones. We have disabled them due to requiring big changes to adopt them, although it's recommended to try to enable some of them into your projects as they enforce type safety:
- [`@typescript-eslint/explicit-module-boundary-types`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md)
- [`@typescript-eslint/no-unsafe-assignment`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md)
- [`@typescript-eslint/no-unsafe-member-access`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md)
- [`@typescript-eslint/no-unsafe-call`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md)
- [`@typescript-eslint/no-unsafe-return`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md)
- [`@typescript-eslint/ban-types`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md)

Required changes:
 - Remove comments for any deprecated rules listed above.
 - Change `@typescript-eslint/camelcase` for `eslint/camelcase` disable comments.
 - `@typescript-eslint/restrict-plus-operands` forces to cast members of an operation both to string | number.
 - `@typescript-eslint/restrict-template-expressions` forces to define a variable used inside a template literal into string/number.
 - `@typescript-eslint/no-floating-promises` forces to have a `catch` in promises.
 - `@typescript-eslint/no-var-requires` forces again to not use `require`.
 - `@typescript-eslint/ban-types`, forbid usage of `String`, `Number` (in favor of `string`, `number`) and `{}`/`object` for types (in favor of `Record` type utility)
