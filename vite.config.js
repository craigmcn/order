import eslint from 'vite-plugin-eslint';

export default {
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
  plugins: [eslint()],
};
