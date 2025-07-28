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
        console.log(`⏭️  跳过: ${item}`);
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
        console.log(`📄 复制文件: ${item}`);
      }
    }
  }
  catch (error) {
    console.error(`❌ 复制目录失败 ${source}:`, error.message);
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始复制模板文件...\n');

  try {
    const cwd = process.cwd();
    const packagesDir = join(cwd, 'packages');
    const templatesDir = join(cwd, 'dist', 'templates');

    // 检查packages目录是否存在
    if (!existsSync(packagesDir)) {
      console.error('❌ packages目录不存在');
      process.exit(1);
    }

    // 清空并重新创建templates目录
    if (existsSync(templatesDir)) {
      console.log('🧹 清空现有模板目录...');
      await rm(templatesDir, { recursive: true, force: true });
    }

    // 确保templates目录存在
    await mkdir(templatesDir, { recursive: true });

    // 读取packages目录下的所有子目录
    const items = await readdir(packagesDir);
    const templates = [];

    for (const item of items) {
      const itemPath = join(packagesDir, item);
      const stats = await stat(itemPath);

      if (stats.isDirectory()) {
        templates.push(item);
      }
    }

    if (templates.length === 0) {
      console.log('⚠️  没有找到可用的模板');
      process.exit(0);
    }

    console.log(`📦 找到 ${templates.length} 个模板:\n`);

    // 复制每个模板
    for (const template of templates) {
      const sourcePath = join(packagesDir, template);
      const targetPath = join(templatesDir, template);

      console.log(`🔄 正在复制模板: ${template}`);
      await copyDirectory(sourcePath, targetPath);

      // 复制根目录下的.vscode和.gitignore
      await copyExtraToTemplate(process.cwd(), targetPath);

      console.log(`✅ 模板 ${template} 复制完成\n`);
    }

    console.log('🎉 所有模板复制完成!');
    console.log(`📁 输出目录: ${templatesDir}`);
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

// 复制根目录下的.vscode和.gitignore到目标模板目录，并重命名
async function copyExtraToTemplate(rootDir, templateDir) {
  const vscodeSrc = join(rootDir, '.vscode');
  const vscodeDest = join(templateDir, '_vscode');
  const gitignoreSrc = join(rootDir, '.gitignore');
  const gitignoreDest = join(templateDir, '_gitignore');

  // 复制.vscode文件夹
  if (existsSync(vscodeSrc)) {
    await copyDirRecursive(vscodeSrc, vscodeDest);
    console.log('📁 复制 .vscode 到模板并重命名为 _vscode');
  }
  // 复制.gitignore文件
  if (existsSync(gitignoreSrc)) {
    await copyFile(gitignoreSrc, gitignoreDest);
    console.log('📄 复制 .gitignore 到模板并重命名为 _gitignore');
  }
}

// 执行主函数
main();
