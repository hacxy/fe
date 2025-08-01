import { execa } from 'execa';
import { expect, it } from 'vitest';

it('helloWorld', async () => {
  const { stdout } = await execa`npx tsx ./src/index.ts hello`;
  expect(stdout).toEqual('Hello world');
});
