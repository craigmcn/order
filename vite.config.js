import eslint from 'vite-plugin-eslint';

export default {
  server: {
    port: 5510,
  },
  plugins: [eslint()],
};
