import { cac } from 'cac';
import pkg from '../package.json';

function bootstrap() {
  const cli = cac(pkg.name);
  cli.version(pkg.version);
  cli.help();
  cli.parse(process.argv);
}

bootstrap();
