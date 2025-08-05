import fs from 'node:fs';
import path from 'node:path';

export function commitMsg() {
  // 检查有没有.git/COMMIT_EDITMSG文件, 没有则给出提示
  if (!fs.existsSync(path.resolve(process.cwd(), '.git/COMMIT_EDITMSG'))) {
    console.error(
      `\n  Error: .git/COMMIT_EDITMSG file not found.
        - Use 'git commit -m "chore: your message"' to commit your changes.
          `
    );
    process.exit(1);
  }

  const msgPath = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG');
  const msg = fs.readFileSync(msgPath, 'utf-8').trim();
  const commitRE = /^Merge.+|(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|types)(?:\(.+\))?: .{1,50}/;
  if (!commitRE.test(msg)) {
    console.error(
      `\n  Error: proper commit message format is required for automated changelog generation.
        - Use 'npm run cz' to interactively generate a commit message.
        - See .github/COMMIT_CONVENTION.md for more details.
          `
    );
    process.exit(1);
  }
}
