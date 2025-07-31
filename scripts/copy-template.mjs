#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';

// 需要排除的文件和目录
const EXCLUDE_PATTERNS = [
  'node_modules',
  'dist',
  'pnpm-lock.yaml',
  '.git',
  '.gitignore',
  '.DS_Store'
];

/**
 * 检查路径是否应该被排除
 * @param {string} path - 文件或目录路径
 * @returns {boolean} - 是否应该排除
 */
function shouldExclude(path) {
  const basename = path.split('/').pop();
  return EXCLUDE_PATTERNS.includes(basename);
}

/**
 * 递归复制目录
 * @param {string} source - 源目录路径
 * @param {string} target - 目标目录路径
 */
async function copyDirectory(source, target) {
  try {
    // 确保目标目录存在
    await mkdir(target, { recursive: true });

    // 读取源目录内容
    const items = await readdir(source);

    for (const item of items) {
      const sourcePath = join(source, item);
      const targetPath = join(target, item);

      // 检查是否应该排除
      if (shouldExclude(item)) {
        continue;
      }

      const stats = await stat(sourcePath);

      if (stats.isDirectory()) {
        // 递归复制子目录
        await copyDirectory(sourcePath, targetPath);
      }
      else {
        // 复制文件
        await copyFile(sourcePath, targetPath);
      }
    }
  }
  catch (error) {
    console.error(`❌ 复制目录失败 ${source}:`, error.message);
  }
}

/**
 * 复制模板到指定目录
 * @param {string} originTemplatesDir - 源模板目录
 * @param {string} targetTemplatesDir - 目标模板目录
 * @param {string[]} templates - 模板列表
 */
async function copyTemplatesToDirectory(originTemplatesDir, targetTemplatesDir, templates) {
  // 清空并重新创建templates目录
  if (existsSync(targetTemplatesDir)) {
    await rm(targetTemplatesDir, { recursive: true, force: true });
  }

  // 确保templates目录存在
  await mkdir(targetTemplatesDir, { recursive: true });

  // 复制每个模板
  for (const template of templates) {
    const sourcePath = join(originTemplatesDir, template);
    const targetPath = join(targetTemplatesDir, template);

    await copyDirectory(sourcePath, targetPath);
    await copyExtraToTemplate(process.cwd(), targetPath);
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始复制模板文件...\n');

  try {
    const cwd = process.cwd();
    const originTemplatesDir = join(cwd, 'templates');
    
    // 定义多个目标目录
    const targetDirectories = [
      join(cwd, './packages/create-fe/dist', 'templates'),
      join(cwd, './packages/fe/dist', 'templates')
    ];

    // 检查packages目录是否存在
    if (!existsSync(originTemplatesDir)) {
      console.error('❌ templates目录不存在');
      process.exit(1);
    }

    // 读取packages目录下的所有子目录
    const items = await readdir(originTemplatesDir);
    const templates = [];

    for (const item of items) {
      const itemPath = join(originTemplatesDir, item);
      const stats = await stat(itemPath);

      if (stats.isDirectory()) {
        templates.push(item);
      }
    }

    if (templates.length === 0) {
      console.log('⚠️  没有找到可用的模板');
      process.exit(0);
    }

    console.log(`📦 找到 ${templates.length} 个模板`);

    // 复制到每个目标目录
    for (const targetDir of targetDirectories) {
      await copyTemplatesToDirectory(originTemplatesDir, targetDir, templates);
    }

    console.log('✅ 所有模板复制完成!');
    console.log('📁 输出目录:');
    targetDirectories.forEach(dir => console.log(`   - ${dir}`));
  }
  catch (error) {
    console.error('❌ 脚本执行失败:', error.message);
    process.exit(1);
  }
}

// 递归复制文件夹
async function copyDirRecursive(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirRecursive(srcPath, destPath);
    }
    else {
      await copyFile(srcPath, destPath);
    }
  }
}

// 复制根目录下的.vscode、.gitignore、scripts目录和commit-msg.mjs到目标模板目录，并重命名
async function copyExtraToTemplate(rootDir, templateDir) {
  const vscodeSrc = join(rootDir, '.vscode');
  const githubSrc = join(rootDir, '.github');
  const vscodeDest = join(templateDir, '_vscode');
  const githubDest = join(templateDir, '_github');
  const gitignoreSrc = join(rootDir, '.gitignore');
  const gitignoreDest = join(templateDir, '_gitignore');

  // 复制.vscode文件夹
  if (existsSync(vscodeSrc)) {
    await copyDirRecursive(vscodeSrc, vscodeDest);
  }

  // 复制.gitignore文件
  if (existsSync(gitignoreSrc)) {
    await copyFile(gitignoreSrc, gitignoreDest);
  }

  // 复制.github文件夹
  if (existsSync(githubSrc)) {
    await copyDirRecursive(githubSrc, githubDest);
  }
}

// 执行主函数
main();
