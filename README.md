# @hacxy/fe

## 简介

`@hacxy/fe` 是一个现代化的前端项目模板集合与脚手架工具，旨在帮助你快速初始化、开发和管理前端项目。通过命令行工具选择模板并生成项目，内置最佳实践配置，开箱即用。

所有模板的基础配置（如 ESLint、TypeScript 配置等）都采用了我个人喜好的风格，统一使用自定义的 [@hacxy/eslint-config](https://github.com/hacxy/eslint-config) 和 [@hacxy/tsconfig](https://github.com/hacxy/tsconfig)。

你可以在每个模板的 `package.json` 和相关配置文件中看到这些自定义配置的应用。例如：

- ESLint 配置：继承自 `@hacxy/eslint-config`，风格统一，支持最新的语法和最佳实践。
- TypeScript 配置：基于 `@hacxy/tsconfig`，适合现代前端/Node.js 项目开发。
- 其他如 commit 规范、git hooks、lint-staged 等也都集成了我的常用方案。

如果你喜欢我的风格，可以直接使用这些模板快速开始项目开发；如需自定义，也可以很方便地调整相关配置。

---

## 创建项目

通过 `npm`、`pnpm` 或 `yarn` ：

```sh
# npm
npm create @hacxy/fe@latest

# pnpm
pnpm create @hacxy/fe

# yarn
yarn create @hacxy/fe
```

通过全局安装 `@hacxy/fe` 创建项目

```sh
npm install @hacxy/fe -g

# 创建项目
fe new
```

