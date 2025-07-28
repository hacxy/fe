import { existsSync } from 'node:fs';
import { cp, readdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';

export async function getTemplates(templatesDir: string): Promise<string[]> {
  if (!existsSync(templatesDir)) {
    return [];
  }
  const items = await readdir(templatesDir);
  const templates: string[] = [];
  for (const item of items) {
    const itemPath = join(templatesDir, item);
    const stats = await stat(itemPath);
    if (stats.isDirectory()) {
      templates.push(item);
    }
  }
  return templates;
}

export async function copyTemplate(src: string, dest: string) {
  // Node.js v16.7+ supports recursive copy
  await cp(src, dest, { recursive: true, errorOnExist: false });
}

export async function emptyDir(dir: string) {
  const files = await readdir(dir);
  await Promise.all(
    files.map(file =>
      rm(join(dir, file), { recursive: true, force: true })
    )
  );
}
