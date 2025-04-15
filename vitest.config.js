import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './tests/setup.js',
      outputFile: './tests/test-report.json',
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/**',
          'coverage/**',
          'dist/**',
          '**/{vite,vitest,tailwind}.config.js'
        ],
        extension: ['.js', '.jsx']
      }
    },
  }),
);
