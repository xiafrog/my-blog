---
icon: linter
category: [前端, 工具]
tag: [前端, ESLint, Prettier]
star: true
---

# ESLint

> **Lint**（Linter）是一种静态代码分析工具，用于标记代码中某些编码错误、风格问题和不具结构性（易导致 bug）的代码。简单理解就是一个代码检查器，检查目标代码是否符合语法和规定的风格习惯。
>
> ESLint 是基于 ECMAScript/JavaScript 语法的 Lint，能够：
>
> - 查出JavaScript代码语法问题。
> - 根据配置的规则，标记不符合规范的代码。
> - 自动修复一些结构、风格问题。
>
> ESLint 的特点是灵活、高度自定义，用户可以通过多种方式配置在项目中应用的规则和其它配置，也可以自定义自己的规则，还可以通过插件的方式拓展功能。

我主要使用ESLint来检查一些语法问题，以及代码规范，再用Prettier来格式化代码。

配合VS Code中的[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)和[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)这两个插件，可以实现自动的代码检查，和自动的格式化（需要在VS Code的设置中配置保存时格式化代码）。

在Vue3的项目中，我会使用`plugin:vue/vue3-recommended`插件来实现对Vue3代码的校验，通过`airbnb-base`插件引入Airbnb风格的代码检查，最后用`plugin:prettier/recommended`插件在ESLint集成Prettier，同时解决ESLint和Prettier冲突的问题。下面贴出我的常用配置：

```ts
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          'test.{js,jsx}', // repos with a single test file
          'test-*.{js,jsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.js', // jest config
          '**/webpack.config.js', // webpack config
          '**/webpack.config.*.js', // webpack config
          '**/rollup.config.js', // rollup config
          '**/rollup.config.*.js', // rollup config
          '**/gulpfile.js', // gulp config
          '**/gulpfile.*.js', // gulp config
          '**/Gruntfile{,.js}', // grunt config
          '**/protractor.conf.js', // protractor config
          '**/protractor.conf.*.js', // protractor config
          '**vite**',
          '**@vitejs**',
        ],
        optionalDependencies: false,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // for reduce accumulators
          'accumulator', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'context', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
          'staticContext', // for ReactRouter context
          'state', // for vuex state
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
      },
    ],
  },
};
```

最后，因为个人习惯使用单引号，添加了Prettier的配置:

```js
// .prettierrc.js
module.exports = {
    singleQuote: true, // 使用单引号
}
```
