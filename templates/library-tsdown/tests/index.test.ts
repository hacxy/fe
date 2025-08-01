import { expect, it } from 'vitest';
import { sum } from '../src/index.js';

it('sum', () => {
  expect(sum(1, 2)).toEqual(3);
});
