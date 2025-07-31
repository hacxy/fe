import { cac } from 'cac';
import { commitMsg } from '../../../shared-lib/commit-msg.js';
import { createApp } from '../../../shared-lib/create-app.js';
import pkg from '../package.json';

function bootstrap() {
  const cli = cac('fe');

  cli.command('msg', 'check commit message').action(() => {
    commitMsg();
  });

  cli.command('new', 'create a new project')
    .option('-t, --template <template>', 'the template to use')
    .action(({ template }) => {
      createApp(template);
    });

  cli.version(pkg.version);
  cli.help();
  cli.parse(process.argv);
}

bootstrap();
