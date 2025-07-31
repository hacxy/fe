import { cac } from 'cac';
import { commitMsg } from '../../../shared-lib/commit-msg.js';
import pkg from '../package.json';

function bootstrap() {
  const cli = cac('fe');
  cli.command('commit-msg').action(() => {
    commitMsg();
  });
  cli.version(pkg.version);
  cli.help();
  cli.parse(process.argv);
}

bootstrap();
