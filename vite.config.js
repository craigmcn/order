import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: [
        { dir: 'dist' },
        { dir: 'dist/order' }, // For Netlify subdirectory
      ],
    },
  },
  server: {
    port: 5510,
  },
  plugins: [
    react(), 
    tailwindcss(),
    eslint()
  ],
});
