# @hacxy/fe

一个现代化的前端项目脚手架工具，提供快速创建和管理前端项目的功能。

## 特性

- 🚀 **快速创建项目** - 支持多种项目模板
- 📝 **提交信息检查** - 自动验证 Git 提交信息格式
- 🛠️ **现代化工具链** - 集成 ESLint、TypeScript 等工具
- 📦 **模板系统** - 提供多种预设模板
- 🔧 **自动化配置** - 自动配置 Git hooks 和代码检查

## 安装

```bash
npm install -g @hacxy/fe
```

或者使用 pnpm：

```bash
pnpm add -g @hacxy/fe
```

## 使用方法

### 创建新项目

```bash
fe new [项目名称]
```

或者使用特定模板：

```bash
fe new [项目名称] --template [模板名称]
```

#### 可用模板

- `cli-ink` - 基于 Ink 的 CLI 应用模板
- `cli-tsdown` - 基于 tsdown 的 CLI 应用模板
- `cli-unbuild` - 基于 unbuild 的 CLI 应用模板
- `library-tsdown` - 基于 tsdown 的库模板

### 检查提交信息

```bash
fe msg
```

验证 Git 提交信息是否符合约定式提交规范。

## 命令详解

### `fe new`

创建新的前端项目。

**选项：**

- `-t, --template <template>` - 指定要使用的模板

**示例：**

```bash
# 交互式创建项目
fe new my-project

# 使用特定模板创建项目
fe new my-project --template cli-ink
```

### `fe msg`

检查 Git 提交信息格式。

**说明：**

- 验证提交信息是否符合约定式提交规范
- 支持的类型：feat、fix、docs、style、refactor、perf、test、build、ci、chore、revert、types
- 格式要求：`type(scope): description`

**示例：**

```bash
# 在 Git hooks 中自动调用
git commit -m "feat: add new feature"
```

## 模板说明

### cli-ink

基于 [Ink](https://github.com/vadimdemedes/ink) 的 CLI 应用模板，支持 React 组件化开发命令行界面。

**特性：**

- React 组件化开发
- 热重载支持
- TypeScript 支持
- 现代化构建工具

### cli-tsdown

基于 [tsdown](https://github.com/hacxy/tsdown) 的 CLI 应用模板，轻量级 TypeScript 构建工具。

**特性：**

- 快速构建
- 零配置
- TypeScript 支持
- 现代化输出

### cli-unbuild

基于 [unbuild](https://github.com/unjs/unbuild) 的 CLI 应用模板，统一的构建工具。

**特性：**

- 统一的构建配置
- 多格式输出
- 类型生成
- 现代化工具链

### library-tsdown

基于 tsdown 的库模板，适用于开发 TypeScript 库。

**特性：**

- 库开发优化
- 类型声明生成
- 现代化打包
- 完整的开发工具链

## 项目结构

创建的项目会自动配置以下功能：

- **Git Hooks** - 自动配置 pre-commit 和 commit-msg hooks
- **代码检查** - 集成 ESLint 和 lint-staged
- **TypeScript** - 完整的 TypeScript 支持
- **构建工具** - 根据模板选择合适的构建工具

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
