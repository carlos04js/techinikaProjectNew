// D:\Projects2025\techinikaProjectNew\frontend\vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Para forçar IPv4
    port: 5173,
    open: true,
  }
});