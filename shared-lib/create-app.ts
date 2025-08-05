#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import pkg from '../packages/fe/package.json';
import { copyTemplate, emptyDir, getTemplates } from './utils.js';

async function renameTemplateSpecialFiles(dest: string) {
  const gitignorePath = join(dest, '_gitignore');
  const vscodePath = join(dest, '_vscode');
  const githubPath = join(dest, '_github');
  if (existsSync(gitignorePath)) {
    await rename(gitignorePath, join(dest, '.gitignore'));
  }
  if (existsSync(vscodePath)) {
    await rename(vscodePath, join(dest, '.vscode'));
  }
  if (existsSync(githubPath)) {
    await rename(githubPath, join(dest, '.github'));
  }
}

async function creator(template: string, projectName: string, templatesDir: string) {
  let projectPath = resolve(process.cwd(), projectName);
  if (projectName === '.' || projectName === './') {
    projectPath = process.cwd();
  }

  // 检查目录是否已存在且非空
  if (existsSync(projectPath)) {
    const files = await readdir(projectPath);
    if (files.length > 0) {
      const { shouldClear } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldClear',
          message: `${projectPath} 已存在且非空，是否清空该目录后继续？`,
          default: false,
        },
      ]);
      if (!shouldClear) {
        console.log(chalk.yellow('操作已取消。'));
        process.exit(0);
      }
      else {
        // 清空目录, 如果项目名称是当前目录，则清空当前下的所有文件, 而不是删除整个目录
        if (projectName === '.' || projectName === './') {
          await emptyDir(resolve(projectPath));
        }
        else {
          try {
            await rm(projectPath, { recursive: true, force: true });
          }
          catch (err: any) {
            console.log(chalk.red(`清空目录失败: ${err.message}`));
            process.exit(1);
          }
        }
      }
    }
  }

  let visibleProjectName = projectName;
  if (projectName === '.' || projectName === './') {
    visibleProjectName = process.cwd().split(/[\\/]/).pop() || 'project';
  }

  try {
    const src = join(templatesDir, template);
    const dest = resolve(process.cwd(), projectName);
    await copyTemplate(src, dest);

    // 修改package.json
    const packageJsonPath = join(dest, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
    packageJson.name = visibleProjectName;
    packageJson.devDependencies['simple-git-hooks'] = '^2.13.0';
    packageJson.devDependencies['lint-staged'] = '^16.1.2';
    packageJson.devDependencies[pkg.name] = `^${pkg.version}`;
    packageJson.scripts.prepare = 'simple-git-hooks';
    packageJson['simple-git-hooks'] = {
      'pre-commit': 'npx lint-staged',
      'commit-msg': 'fe msg'
    };
    packageJson['lint-staged'] = {
      '*': [
        'npm run lint:staged'
      ]
    };
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    await renameTemplateSpecialFiles(dest);
    const { shouldRelease } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldRelease',
        message: '是否需要github版本发布流程？',
        default: true,
      },
    ]);
    if (!shouldRelease) {
      await rm(join(dest, '.github/workflows/release.yml'), { force: true });
    }

    console.log(chalk.green(`项目 ${visibleProjectName} 创建成功！`));
    console.log(chalk.cyan('\n请进入项目目录并开始开发：'));
    console.log(chalk.yellow(`\n  cd ${projectName}\n`));
  }
  catch (err: any) {
    console.log(chalk.red(`项目创建失败: ${err.message}`));
    process.exit(1);
  }
}

export async function createApp(template?: string) {
  const templatesDir = resolve(__dirname, '../dist/templates');
  const templates = await getTemplates(templatesDir);

  if (templates.length === 0) {
    console.log(chalk.red('❌ 未找到任何模板，请先运行模板构建脚本。'));
    process.exit(1);
  }

  if (!template) {
    const { template: selectedTemplate } = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: '请选择要使用的模板：',
        choices: templates,
      },
    ]);
    template = selectedTemplate;
  }

  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称：',
      validate: (input: string) => {
        if (!input) return '项目名称不能为空';
        return true;
      },
    },
  ]);

  if (!template) {
    console.log(chalk.red('❌ 未选择模板，请先选择模板。'));
    process.exit(1);
  }

  await creator(template, projectName, templatesDir);
}
