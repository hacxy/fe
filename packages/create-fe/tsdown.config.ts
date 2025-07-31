import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  shims: true,
  format: ['esm'],
  clean: false,
  declaration: false,
  target: 'node18',
  sourcemap: false,
});
