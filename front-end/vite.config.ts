import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/styles/global.scss' as *;`,
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src')},
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
});
