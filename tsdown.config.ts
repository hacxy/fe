import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./bin'],
  shims: true,
  format: ['esm'],
  target: 'node18',
  clean: false
});
