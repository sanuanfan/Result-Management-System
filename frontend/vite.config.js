import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from '@vitejs/plugin-vue'; // or other SSR plugins if needed

export default defineConfig({
  plugins: [react(), ssr()],
  base: '/',
  build: {
    ssr: true,
    outDir: 'dist'
  }
});
