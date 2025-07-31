import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src'],
  shims: true,
  format: ['esm'],
  clean: false,
});
