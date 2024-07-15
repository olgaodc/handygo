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
      scss: {},
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@navigation': path.resolve(__dirname, './src/navigation'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  },
});
