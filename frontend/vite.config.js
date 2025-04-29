import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: ['frontend'],
  },
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // To use `expect` without import nothing
    environment: 'jsdom',
    setupFiles: ['./setupTests.js']
  }
});
