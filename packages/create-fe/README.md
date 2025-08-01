# @hacxy/create-fe

一个简化的前端项目创建工具，提供快速创建现代化前端项目的功能。

## 特性

- 🚀 **一键创建项目** - 无需复杂配置，快速启动
- 📦 **多种模板支持** - 提供多种预设项目模板
- 🛠️ **现代化工具链** - 自动配置 TypeScript、ESLint 等工具
- 🔧 **自动化设置** - 自动配置 Git hooks 和代码检查
- 📝 **交互式体验** - 友好的命令行交互界面

## 安装

```bash
npm install -g @hacxy/create-fe
```

或者使用 pnpm：

```bash
pnpm add -g @hacxy/create-fe
```

## 使用方法

### 创建新项目

```bash
create-fe
```

或者直接使用 npx（推荐）：

```bash
npx @hacxy/create-fe
```

### 交互式创建

运行命令后，工具会引导你完成以下步骤：

1. **选择模板** - 从可用的项目模板中选择
2. **输入项目名称** - 指定新项目的名称
3. **自动创建** - 工具会自动创建项目并配置所有必要的文件

## 可用模板

### CLI 应用模板

- **cli-ink** - 基于 [Ink](https://github.com/vadimdemedes/ink) 的 CLI 应用
  - React 组件化开发
  - 热重载支持
  - TypeScript 支持
  - 现代化构建工具

- **cli-tsdown** - 基于 [tsdown](https://github.com/hacxy/tsdown) 的 CLI 应用
  - 快速构建
  - 零配置
  - TypeScript 支持
  - 现代化输出

- **cli-unbuild** - 基于 [unbuild](https://github.com/unjs/unbuild) 的 CLI 应用
  - 统一的构建配置
  - 多格式输出
  - 类型生成
  - 现代化工具链

### 库模板

- **library-tsdown** - 基于 tsdown 的 TypeScript 库
  - 库开发优化
  - 类型声明生成
  - 现代化打包
  - 完整的开发工具链

## 项目结构

创建的项目会自动包含以下配置：

### 自动配置的功能

- **Git Hooks** - 配置 pre-commit 和 commit-msg hooks
- **代码检查** - 集成 ESLint 和 lint-staged
- **TypeScript** - 完整的 TypeScript 支持
- **构建工具** - 根据模板选择合适的构建工具
- **开发脚本** - 提供 dev、build、lint 等常用脚本

### 示例项目结构

```
my-project/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── .gitignore
└── README.md
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 代码检查
pnpm lint

# 发布
pnpm release
```

## 相关

- **create-fe** - 简化的项目创建工具，专注于快速创建项目
- **@hacxy/fe** - 完整的脚手架工具，包含项目创建和提交信息检查等功能
