import { expect, it } from 'vitest';
import { foo, sum } from '../src/index.js';

it('sum', () => {
  expect(sum(1, 2)).toEqual(3);
});

it('foo', () => {
  expect(foo('Hacxy')).toEqual('Hello Hacxy');
});
